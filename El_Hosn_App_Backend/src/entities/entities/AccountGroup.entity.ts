import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_group', { schema: 'public' })
export class AccountGroup {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  parent_id!: number | null;

  @Column()
  company_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  code_prefix_start!: string | null;

  @Column({ nullable: true })
  code_prefix_end!: string | null;

  @Column()
  name!: any;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
