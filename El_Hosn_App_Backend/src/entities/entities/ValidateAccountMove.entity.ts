import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('validate_account_move', { schema: 'public' })
export class ValidateAccountMove {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  force_post!: boolean | null;

  @Column({ nullable: true })
  force_hash!: boolean | null;

  @Column({ nullable: true })
  ignore_abnormal_date!: boolean | null;

  @Column({ nullable: true })
  ignore_abnormal_amount!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
