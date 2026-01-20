import { DataSource } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

const dataSource = new DataSource({
    type: 'postgres',
    host: '72.62.16.223',
    port: 5432,
    username: 'odoo',
    password: 'odoo',
    database: 'Hosn',
    schema: 'public',
});

async function getAllTables(): Promise<string[]> {
    const query = `
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_type = 'BASE TABLE'
    ORDER BY table_name;
  `;

    const result = await dataSource.query(query);
    return result.map((row: any) => row.table_name);
}

async function getTableColumns(tableName: string): Promise<any[]> {
    const query = `
    SELECT 
      column_name,
      data_type,
      is_nullable,
      column_default,
      character_maximum_length,
      numeric_precision,
      numeric_scale
    FROM information_schema.columns
    WHERE table_schema = 'public' 
    AND table_name = $1
    ORDER BY ordinal_position;
  `;

    return await dataSource.query(query, [tableName]);
}

async function getPrimaryKeys(tableName: string): Promise<string[]> {
    const query = `
    SELECT a.attname
    FROM pg_index i
    JOIN pg_attribute a ON a.attrelid = i.indrelid AND a.attnum = ANY(i.indkey)
    WHERE i.indrelid = $1::regclass
    AND i.indisprimary;
  `;

    const result = await dataSource.query(query, [`public.${tableName}`]);
    return result.map((row: any) => row.attname);
}

function mapPostgresTypeToTS(dataType: string, isNullable: string): string {
    const baseType = dataType.toLowerCase();
    let tsType = 'string';

    if (baseType.includes('int') || baseType.includes('serial')) {
        tsType = 'number';
    } else if (baseType.includes('bool')) {
        tsType = 'boolean';
    } else if (baseType.includes('timestamp') || baseType.includes('date')) {
        tsType = 'Date';
    } else if (baseType.includes('json')) {
        tsType = 'any';
    } else if (baseType.includes('numeric') || baseType.includes('decimal') || baseType.includes('float') || baseType.includes('double')) {
        tsType = 'number';
    }

    return isNullable === 'YES' ? `${tsType} | null` : tsType;
}

function toPascalCase(str: string): string {
    return str
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('');
}

async function generateEntity(tableName: string, outputDir: string): Promise<boolean> {
    const className = toPascalCase(tableName);
    const fileName = `${className}.entity.ts`;
    const filePath = path.join(outputDir, fileName);

    if (fs.existsSync(filePath)) {
        return false;
    }

    const columns = await getTableColumns(tableName);
    const primaryKeys = await getPrimaryKeys(tableName);

    let entityContent = `import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('${tableName}', { schema: 'public' })
export class ${className} {
`;

    for (const col of columns) {
        const columnName = col.column_name;
        const isPrimary = primaryKeys.includes(columnName);
        const tsType = mapPostgresTypeToTS(col.data_type, col.is_nullable);

        if (isPrimary) {
            if (col.column_default?.includes('nextval')) {
                entityContent += `  @PrimaryGeneratedColumn()\n`;
            } else {
                entityContent += `  @PrimaryColumn()\n`;
            }
        } else {
            const columnOptions: string[] = [];

            if (col.is_nullable === 'YES') {
                columnOptions.push('nullable: true');
            }

            if (col.character_maximum_length) {
                columnOptions.push(`length: ${col.character_maximum_length}`);
            }

            if (col.column_default) {
                columnOptions.push(`default: () => "${col.column_default}"`);
            }

            const options = columnOptions.length > 0 ? `{ ${columnOptions.join(', ')} }` : '';
            entityContent += `  @Column(${options})\n`;
        }

        entityContent += `  ${columnName}!: ${tsType};\n\n`;
    }

    entityContent += `}\n`;

    fs.writeFileSync(filePath, entityContent);
    console.log(`✓ Generated: ${fileName}`);
    return true;
}

async function main() {
    try {
        await dataSource.initialize();
        console.log('📦 Connected to database');

        const outputDir = './src/entities';
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const tables = await getAllTables();
        console.log(`📊 Found ${tables.length} tables in database`);

        let successCount = 0;
        let skipCount = 0;
        let failCount = 0;

        for (const table of tables) {
            try {
                const generated = await generateEntity(table, outputDir);
                if (generated) {
                    successCount++;
                } else {
                    skipCount++;
                }
            } catch (error) {
                console.error(`✗ Failed to generate ${table}:`, error);
                failCount++;
            }
        }

        console.log(`\n✅ Generation complete!`);
        console.log(`   Generated: ${successCount}`);
        console.log(`   Skipped:   ${skipCount} (Already exist)`);
        console.log(`   Failed:    ${failCount}`);

        await dataSource.destroy();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

main();