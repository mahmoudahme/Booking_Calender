import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('onboarding_onboarding_step', { schema: 'public' })
export class OnboardingOnboardingStep {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  done_icon!: string | null;

  @Column({ nullable: true })
  step_image_filename!: string | null;

  @Column({ nullable: true })
  panel_step_open_action_name!: string | null;

  @Column({ type: 'jsonb', nullable: true })
  title!: any | null;

  @Column({ type: 'jsonb', nullable: true })
  description!: any | null;

  @Column({ type: 'jsonb' })
  button_text!: any;

  @Column({ type: 'jsonb', nullable: true })
  done_text!: any | null;

  @Column({ type: 'jsonb', nullable: true })
  step_image_alt!: any | null;

  @Column({ nullable: true })
  is_per_company!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
