import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('res_country_group_res_country_state_rel', { schema: 'public' })
export class ResCountryGroupResCountryStateRel {
  @PrimaryColumn()
  res_country_group_id!: number;

  @PrimaryColumn()
  res_country_state_id!: number;

}
