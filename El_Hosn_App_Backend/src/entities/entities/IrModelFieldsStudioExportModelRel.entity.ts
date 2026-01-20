import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ir_model_fields_studio_export_model_rel', { schema: 'public' })
export class IrModelFieldsStudioExportModelRel {
  @PrimaryColumn()
  studio_export_model_id!: number;

  @PrimaryColumn()
  ir_model_fields_id!: number;

}
