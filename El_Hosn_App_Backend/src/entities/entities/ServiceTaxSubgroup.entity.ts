import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('service_tax_subgroup', { schema: 'public' })
export class ServiceTaxSubgroup {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  service_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  tax_group_type!: string | null;

  @Column({ nullable: true })
  tax_group!: string | null;

  @Column({ nullable: true })
  tax_sub_group!: string | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
