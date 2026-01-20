import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

export enum OtpType {
  SIGNUP = 'signup',
  LOGIN = 'login',
  PHONE_LOGIN = 'phone_login',
}

@Entity('otps', { schema: 'public' })
export class Otps {
  @PrimaryColumn()
  id!: string;

  @Column()
  code!: string;

  @Column()
  type!: string;

  @Column()
  expiresAt!: Date;

  @Column({ default: () => "false" })
  isUsed!: boolean;

  @Column()
  userId!: string;

  @Column({ default: () => "now()" })
  createdAt!: Date;

}
