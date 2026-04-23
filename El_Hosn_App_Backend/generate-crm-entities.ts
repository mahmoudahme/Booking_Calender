import { DataSource } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

// --- Configuration ---
const TABLES_TO_GENERATE = [
    'crm_lead',
    'crm_stage',
    'crm_lost_reason',
    'utm_source',
    'utm_medium',
    'discuss_channel',
    'discuss_channel_member',
    'mail_message',
];

const DB_HOST = '46.225.164.73';
const DB_PORT = 5432;
const DB_USERNAME = 'odoo19';
const DB_PASSWORD = 'odoo';
const DB_DATABASE = 'Hosn';
const DB_SCHEMA = 'public';
const OUTPUT_DIR = './src/entities/entities';

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
        return 'string';
    }
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

    const columns = await getTableColumns(tableName);

    if (columns.length === 0) {
        console.error(`❌ Table '${tableName}' not found or has no columns.`);
        return false;
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

        let decorator = '';
        if (isPrimary) {
            if (col.column_default && col.column_default.includes('nextval')) {
                decorator = `  @PrimaryGeneratedColumn()`;
            } else {
                decorator = `  @PrimaryColumn()`;
            }
        } else {
            const options: string[] = [];

            if (col.data_type.toLowerCase().includes('json')) {
                options.push(`type: 'jsonb'`);
            }

            if (isNullable) {
                options.push('nullable: true');
            }

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
    console.log(`✅ Generated: ${className} (${filePath})`);
    return true;
}

async function main() {
    try {
        await dataSource.initialize();
        console.log('📦 Connected to database\n');

        let success = 0;
        let failed = 0;

        for (const table of TABLES_TO_GENERATE) {
            const ok = await generateEntity(table, OUTPUT_DIR);
            if (ok) success++;
            else failed++;
        }

        console.log(`\n🎉 Done! ${success} generated, ${failed} failed.`);
        await dataSource.destroy();
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

main();
