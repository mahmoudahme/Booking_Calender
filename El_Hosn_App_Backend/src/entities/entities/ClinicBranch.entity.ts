import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('clinic_branch', { schema: 'public' })
export class ClinicBranch {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  company_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name!: string;

  @Column({ nullable: true })
  name_ar!: string | null;

  @Column({ nullable: true })
  code!: string | null;

  @Column({ nullable: true })
  phone!: string | null;

  @Column({ nullable: true })
  email!: string | null;

  @Column({ nullable: true })
  address!: string | null;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
