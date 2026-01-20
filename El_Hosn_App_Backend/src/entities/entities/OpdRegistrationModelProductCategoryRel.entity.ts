import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('opd_registration_model_product_category_rel', { schema: 'public' })
export class OpdRegistrationModelProductCategoryRel {
  @PrimaryColumn()
  opd_registration_model_id!: number;

  @PrimaryColumn()
  product_category_id!: number;

}
