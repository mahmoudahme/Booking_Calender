import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_auto_reconcile_wizard_res_partner_rel', { schema: 'public' })
export class AccountAutoReconcileWizardResPartnerRel {
  @PrimaryColumn()
  account_auto_reconcile_wizard_id!: number;

  @PrimaryColumn()
  res_partner_id!: number;

}
