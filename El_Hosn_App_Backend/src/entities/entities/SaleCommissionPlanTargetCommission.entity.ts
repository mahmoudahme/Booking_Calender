import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sale_commission_plan_target_commission', { schema: 'public' })
export class SaleCommissionPlanTargetCommission {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  plan_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  amount!: number;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column()
  target_rate!: number;

  @Column({ nullable: true })
  amount_rate!: number | null;

}
