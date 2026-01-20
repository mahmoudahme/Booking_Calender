import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sale_commission_plan_target_forecast', { schema: 'public' })
export class SaleCommissionPlanTargetForecast {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  plan_id!: number | null;

  @Column()
  target_id!: number;

  @Column()
  user_id!: number;

  @Column({ nullable: true })
  team_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  notes!: string | null;

  @Column({ nullable: true })
  amount!: number | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
