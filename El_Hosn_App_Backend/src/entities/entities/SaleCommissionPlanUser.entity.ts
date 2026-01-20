import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sale_commission_plan_user', { schema: 'public' })
export class SaleCommissionPlanUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  plan_id!: number;

  @Column()
  user_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  date_from!: Date | null;

  @Column({ nullable: true })
  date_to!: Date | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
