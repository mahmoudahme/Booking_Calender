import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('journal_table', { schema: 'public' })
export class JournalTable {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  journal_id!: number;

  @Column({ nullable: true })
  payment_type!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column()
  amount!: number;

}
