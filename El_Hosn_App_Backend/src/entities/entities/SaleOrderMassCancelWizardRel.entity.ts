import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sale_order_mass_cancel_wizard_rel', { schema: 'public' })
export class SaleOrderMassCancelWizardRel {
  @PrimaryColumn()
  sale_mass_cancel_orders_id!: number;

  @PrimaryColumn()
  sale_order_id!: number;

}
