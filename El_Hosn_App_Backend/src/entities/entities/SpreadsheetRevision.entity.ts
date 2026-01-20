import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('spreadsheet_revision', { schema: 'public' })
export class SpreadsheetRevision {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  res_id!: number;

  @Column({ nullable: true })
  parent_revision_id!: number | null;

  @Column()
  author_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  name!: string | null;

  @Column()
  res_model!: string;

  @Column()
  commands!: string;

  @Column()
  revision_uuid!: string;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column()
  revision_date!: Date;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
