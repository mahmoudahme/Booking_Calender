import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sale_commission_plan_achievement', { schema: 'public' })
export class SaleCommissionPlanAchievement {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  plan_id!: number;

  @Column({ nullable: true })
  product_id!: number | null;

  @Column({ nullable: true })
  product_categ_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  type!: string;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column()
  rate!: number;

}
