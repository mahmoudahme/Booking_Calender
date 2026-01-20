import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('privacy_lookup_wizard', { schema: 'public' })
export class PrivacyLookupWizard {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  log_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column({ nullable: true })
  execution_details!: string | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
