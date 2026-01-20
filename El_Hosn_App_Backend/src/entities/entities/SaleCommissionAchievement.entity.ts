import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sale_commission_achievement', { schema: 'public' })
export class SaleCommissionAchievement {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  add_user_id!: number | null;

  @Column({ nullable: true })
  reduce_user_id!: number | null;

  @Column()
  company_id!: number;

  @Column({ nullable: true })
  currency_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  note!: string | null;

  @Column()
  date!: Date;

  @Column({ nullable: true })
  achieved!: number | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  currency_rate!: number | null;

}
