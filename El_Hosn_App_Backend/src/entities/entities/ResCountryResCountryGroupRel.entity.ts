import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('res_country_res_country_group_rel', { schema: 'public' })
export class ResCountryResCountryGroupRel {
  @PrimaryColumn()
  res_country_id!: number;

  @PrimaryColumn()
  res_country_group_id!: number;

}
