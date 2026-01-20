import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ir_attachment', { schema: 'public' })
export class IrAttachment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  res_id!: number | null;

  @Column({ nullable: true })
  company_id!: number | null;

  @Column({ nullable: true })
  file_size!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name!: string;

  @Column({ nullable: true })
  res_model!: string | null;

  @Column({ nullable: true })
  res_field!: string | null;

  @Column()
  type!: string;

  @Column({ nullable: true, length: 1024 })
  url!: string | null;

  @Column({ nullable: true })
  access_token!: string | null;

  @Column({ nullable: true })
  store_fname!: string | null;

  @Column({ nullable: true, length: 40 })
  checksum!: string | null;

  @Column({ nullable: true })
  mimetype!: string | null;

  @Column({ nullable: true })
  description!: string | null;

  @Column({ nullable: true })
  index_content!: string | null;

  @Column({ nullable: true })
  public!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  db_datas!: string | null;

  @Column({ nullable: true })
  original_id!: number | null;

}
