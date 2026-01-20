import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('opd_registration_model_product_template_rel', { schema: 'public' })
export class OpdRegistrationModelProductTemplateRel {
  @PrimaryColumn()
  opd_registration_model_id!: number;

  @PrimaryColumn()
  product_template_id!: number;

}
