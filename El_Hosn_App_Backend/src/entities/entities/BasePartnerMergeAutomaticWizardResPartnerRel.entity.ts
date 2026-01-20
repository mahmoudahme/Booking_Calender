import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('base_partner_merge_automatic_wizard_res_partner_rel', { schema: 'public' })
export class BasePartnerMergeAutomaticWizardResPartnerRel {
  @PrimaryColumn()
  base_partner_merge_automatic_wizard_id!: number;

  @PrimaryColumn()
  res_partner_id!: number;

}
