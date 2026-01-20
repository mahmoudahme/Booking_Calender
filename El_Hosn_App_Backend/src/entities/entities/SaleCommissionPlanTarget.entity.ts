import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sale_commission_plan_target', { schema: 'public' })
export class SaleCommissionPlanTarget {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  plan_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name!: string;

  @Column()
  date_from!: Date;

  @Column()
  date_to!: Date;

  @Column({ nullable: true })
  payment_date!: Date | null;

  @Column()
  amount!: number;

  @Column({ nullable: true })
  payment_amount!: number | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
