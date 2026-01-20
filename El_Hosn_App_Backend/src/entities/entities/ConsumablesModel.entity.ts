import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('consumables_model', { schema: 'public' })
export class ConsumablesModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  product_id!: number | null;

  @Column({ nullable: true })
  unit!: number | null;

  @Column({ nullable: true })
  quantity!: number | null;

  @Column({ nullable: true })
  available_quantity!: number | null;

  @Column({ nullable: true })
  sale_id!: number | null;

  @Column({ nullable: true })
  reg_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  state!: string | null;

  @Column({ nullable: true })
  invoice_include!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  sale_price!: number | null;

}
