import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('module_country', { schema: 'public' })
export class ModuleCountry {
  @PrimaryColumn()
  module_id!: number;

  @PrimaryColumn()
  country_id!: number;

}
