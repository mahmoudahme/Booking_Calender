import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('res_country_group_pricelist_rel', { schema: 'public' })
export class ResCountryGroupPricelistRel {
  @PrimaryColumn()
  pricelist_id!: number;

  @PrimaryColumn()
  res_country_group_id!: number;

}
