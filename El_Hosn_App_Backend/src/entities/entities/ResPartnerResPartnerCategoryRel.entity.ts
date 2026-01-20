import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('res_partner_res_partner_category_rel', { schema: 'public' })
export class ResPartnerResPartnerCategoryRel {
  @PrimaryColumn()
  category_id!: number;

  @PrimaryColumn()
  partner_id!: number;

}
