import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('onboarding_onboarding_onboarding_onboarding_step_rel', { schema: 'public' })
export class OnboardingOnboardingOnboardingOnboardingStepRel {
  @PrimaryColumn()
  onboarding_onboarding_id!: number;

  @PrimaryColumn()
  onboarding_onboarding_step_id!: number;

}
