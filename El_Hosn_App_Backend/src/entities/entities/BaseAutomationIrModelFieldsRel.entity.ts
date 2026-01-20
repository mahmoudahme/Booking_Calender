import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('base_automation_ir_model_fields_rel', { schema: 'public' })
export class BaseAutomationIrModelFieldsRel {
  @PrimaryColumn()
  base_automation_id!: number;

  @PrimaryColumn()
  ir_model_fields_id!: number;

}
