import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payment_capture_wizard_payment_transaction_rel', { schema: 'public' })
export class PaymentCaptureWizardPaymentTransactionRel {
  @PrimaryColumn()
  payment_capture_wizard_id!: number;

  @PrimaryColumn()
  payment_transaction_id!: number;

}
