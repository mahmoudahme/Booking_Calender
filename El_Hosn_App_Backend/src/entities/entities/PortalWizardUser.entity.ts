import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('portal_wizard_user', { schema: 'public' })
export class PortalWizardUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  wizard_id!: number;

  @Column()
  partner_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  email!: string | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
