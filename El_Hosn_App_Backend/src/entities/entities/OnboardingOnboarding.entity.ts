import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('onboarding_onboarding', { schema: 'public' })
export class OnboardingOnboarding {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  route_name!: string;

  @Column({ nullable: true })
  text_completed!: string | null;

  @Column({ nullable: true })
  panel_close_action_name!: string | null;

  @Column({ type: 'jsonb', nullable: true })
  name!: any | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
