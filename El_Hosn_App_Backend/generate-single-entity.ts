import { DataSource } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

// --- Configuration ---
const TABLE_NAME = 'opd_registration_model'; // Get table name from command line argument
const DB_HOST = '72.62.16.223';
const DB_PORT = 5432;
const DB_USERNAME = 'odoo';
const DB_PASSWORD = 'odoo';
const DB_DATABASE = 'Hosn';
const DB_SCHEMA = 'public';
const OUTPUT_DIR = './src/entities/entities';

if (!TABLE_NAME) {
    console.error('❌ Error: Please provide a table name.');
    console.error('Usage: ts-node generate-single-entity.ts <table_name>');
    process.exit(1);
}

const dataSource = new DataSource({
    type: 'postgres',
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    schema: DB_SCHEMA,
});

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
    WHERE table_schema = $1 
    AND table_name = $2
    ORDER BY ordinal_position;
  `;

    return await dataSource.query(query, [DB_SCHEMA, tableName]);
}

async function getPrimaryKeys(tableName: string): Promise<string[]> {
    // This query might need adjustment depending on your exact PG version/setup, 
    // but works for standard cases to find PKs.
    const query = `
    SELECT kcu.column_name
    FROM information_schema.table_constraints tco
    JOIN information_schema.key_column_usage kcu 
      ON kcu.constraint_name = tco.constraint_name
      AND kcu.constraint_schema = tco.constraint_schema
      AND kcu.constraint_name = tco.constraint_name
    WHERE tco.constraint_type = 'PRIMARY KEY'
      AND kcu.table_schema = $1
      AND kcu.table_name = $2;
  `;

    const result = await dataSource.query(query, [DB_SCHEMA, tableName]);
    return result.map((row: any) => row.column_name);
}

function mapPostgresTypeToTS(dataType: string): string {
    const baseType = dataType.toLowerCase();

    if (
        baseType.includes('int') ||
        baseType.includes('serial') ||
        baseType.includes('numeric') ||
        baseType.includes('decimal') ||
        baseType.includes('float') ||
        baseType.includes('double') ||
        baseType.includes('real')
    ) {
        return 'number';
    } else if (baseType.includes('bool')) {
        return 'boolean';
    } else if (baseType.includes('timestamp') || baseType.includes('date') || baseType.includes('time')) {
        return 'Date';
    } else if (baseType.includes('json')) {
        return 'any';
    } else {
        return 'string'; // default to string for text, varchar, char, uuid, etc.
    }
}

function toPascalCase(str: string): string {
    return str
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('');
}

async function generateEntity(tableName: string, outputDir: string) {
    const className = toPascalCase(tableName);
    const fileName = `${className}.entity.ts`;
    const filePath = path.join(outputDir, fileName);

    const columns = await getTableColumns(tableName);

    if (columns.length === 0) {
        console.error(`❌ Table '${tableName}' not found or has no columns.`);
        return;
    }

    const primaryKeys = await getPrimaryKeys(tableName);

    let entityContent = `import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';\n\n`;
    entityContent += `@Entity('${tableName}', { schema: '${DB_SCHEMA}' })\n`;
    entityContent += `export class ${className} {\n`;

    for (const col of columns) {
        const columnName = col.column_name;
        const isPrimary = primaryKeys.includes(columnName);
        const tsTypeBase = mapPostgresTypeToTS(col.data_type);
        const isNullable = col.is_nullable === 'YES';
        const tsType = isNullable ? `${tsTypeBase} | null` : tsTypeBase;

        // Skip adding ! or ? for now, handle logic below

        let decorator = '';
        if (isPrimary) {
            // Primitive assumption: if default contains nextval, it's generated
            if (col.column_default && col.column_default.includes('nextval')) {
                decorator = `  @PrimaryGeneratedColumn()`;
            } else {
                decorator = `  @PrimaryColumn()`;
            }
        } else {
            const options: string[] = [];

            if (col.data_type.toLowerCase().includes('json')) {
                options.push(`type: 'jsonb'`); // Explicitly set jsonb type
            }

            if (isNullable) {
                options.push('nullable: true');
            }

            // Add options string if not empty
            if (options.length > 0) {
                decorator = `  @Column({ ${options.join(', ')} })`;
            } else {
                decorator = `  @Column()`;
            }
        }

        entityContent += `${decorator}\n`;
        entityContent += `  ${columnName}!: ${tsType};\n\n`;
    }

    entityContent += `}\n`;

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(filePath, entityContent);
    console.log(`\n✅ Successfully generated entity for table '${tableName}'`);
    console.log(`   File: ${filePath}`);
    console.log(`   Class: ${className}`);
}

async function main() {
    try {
        await dataSource.initialize();
        // console.log('📦 Connected to database');

        await generateEntity(TABLE_NAME, OUTPUT_DIR);

        await dataSource.destroy();
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

main();
