import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('change_password_user', { schema: 'public' })
export class ChangePasswordUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  wizard_id!: number;

  @Column()
  user_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  user_login!: string | null;

  @Column({ nullable: true })
  new_passwd!: string | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
