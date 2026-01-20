import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_edi_document', { schema: 'public' })
export class AccountEdiDocument {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  move_id!: number;

  @Column()
  edi_format_id!: number;

  @Column({ nullable: true })
  attachment_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  state!: string | null;

  @Column({ nullable: true })
  blocking_level!: string | null;

  @Column({ nullable: true })
  error!: string | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
