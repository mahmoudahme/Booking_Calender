import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_move_send_wizard_res_partner_rel', { schema: 'public' })
export class AccountMoveSendWizardResPartnerRel {
  @PrimaryColumn()
  account_move_send_wizard_id!: number;

  @PrimaryColumn()
  res_partner_id!: number;

}
