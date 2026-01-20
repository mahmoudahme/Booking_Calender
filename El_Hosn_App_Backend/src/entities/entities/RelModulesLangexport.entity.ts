import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rel_modules_langexport', { schema: 'public' })
export class RelModulesLangexport {
  @PrimaryColumn()
  wiz_id!: number;

  @PrimaryColumn()
  module_id!: number;

}
