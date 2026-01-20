import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mail_followers', { schema: 'public' })
export class MailFollowers {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  res_id!: number | null;

  @Column()
  partner_id!: number;

  @Column()
  res_model!: string;

}
