import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_reconcile_model_res_partner_rel', { schema: 'public' })
export class AccountReconcileModelResPartnerRel {
  @PrimaryColumn()
  account_reconcile_model_id!: number;

  @PrimaryColumn()
  res_partner_id!: number;

}
