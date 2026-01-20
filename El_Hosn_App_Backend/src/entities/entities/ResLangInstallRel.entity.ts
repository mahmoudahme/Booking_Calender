import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('res_lang_install_rel', { schema: 'public' })
export class ResLangInstallRel {
  @PrimaryColumn()
  language_wizard_id!: number;

  @PrimaryColumn()
  lang_id!: number;

}
