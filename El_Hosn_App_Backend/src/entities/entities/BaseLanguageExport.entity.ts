import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('base_language_export', { schema: 'public' })
export class BaseLanguageExport {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  model_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  name!: string | null;

  @Column()
  lang!: string;

  @Column()
  format!: string;

  @Column()
  export_type!: string;

  @Column({ nullable: true })
  domain!: string | null;

  @Column({ nullable: true })
  state!: string | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  data!: string | null;

}
