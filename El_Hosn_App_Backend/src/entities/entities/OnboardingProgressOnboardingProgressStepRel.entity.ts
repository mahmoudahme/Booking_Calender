import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('onboarding_progress_onboarding_progress_step_rel', { schema: 'public' })
export class OnboardingProgressOnboardingProgressStepRel {
  @PrimaryColumn()
  onboarding_progress_id!: number;

  @PrimaryColumn()
  onboarding_progress_step_id!: number;

}
