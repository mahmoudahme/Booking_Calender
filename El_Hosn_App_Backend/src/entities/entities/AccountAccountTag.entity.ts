import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_account_tag', { schema: 'public' })
export class AccountAccountTag {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  color!: number | null;

  @Column({ nullable: true })
  country_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  applicability!: string;

  @Column()
  name!: any;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
