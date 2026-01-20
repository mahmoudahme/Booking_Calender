import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_account_tag_product_template_rel', { schema: 'public' })
export class AccountAccountTagProductTemplateRel {
  @PrimaryColumn()
  product_template_id!: number;

  @PrimaryColumn()
  account_account_tag_id!: number;

}
