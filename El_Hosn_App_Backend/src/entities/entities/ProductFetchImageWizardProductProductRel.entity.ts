import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_fetch_image_wizard_product_product_rel', { schema: 'public' })
export class ProductFetchImageWizardProductProductRel {
  @PrimaryColumn()
  product_fetch_image_wizard_id!: number;

  @PrimaryColumn()
  product_product_id!: number;

}
