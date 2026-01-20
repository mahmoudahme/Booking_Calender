import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('res_bank', { schema: 'public' })
export class ResBank {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  state!: number | null;

  @Column({ nullable: true })
  country!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name!: string;

  @Column({ nullable: true })
  street!: string | null;

  @Column({ nullable: true })
  street2!: string | null;

  @Column({ nullable: true })
  zip!: string | null;

  @Column({ nullable: true })
  city!: string | null;

  @Column({ nullable: true })
  email!: string | null;

  @Column({ nullable: true })
  phone!: string | null;

  @Column({ nullable: true })
  bic!: string | null;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
