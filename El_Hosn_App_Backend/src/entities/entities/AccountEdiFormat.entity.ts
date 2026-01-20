import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_edi_format', { schema: 'public' })
export class AccountEdiFormat {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  name!: string | null;

  @Column()
  code!: string;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
