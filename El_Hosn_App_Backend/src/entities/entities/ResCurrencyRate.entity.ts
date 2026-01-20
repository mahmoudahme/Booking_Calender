import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('res_currency_rate', { schema: 'public' })
export class ResCurrencyRate {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  currency_id!: number;

  @Column({ nullable: true })
  company_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name!: Date;

  @Column({ nullable: true })
  rate!: number | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
