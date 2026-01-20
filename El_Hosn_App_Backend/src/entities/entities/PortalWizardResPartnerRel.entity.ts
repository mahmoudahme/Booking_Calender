import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('portal_wizard_res_partner_rel', { schema: 'public' })
export class PortalWizardResPartnerRel {
  @PrimaryColumn()
  portal_wizard_id!: number;

  @PrimaryColumn()
  res_partner_id!: number;

}
