import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ir_model_fields_group_rel', { schema: 'public' })
export class IrModelFieldsGroupRel {
  @PrimaryColumn()
  field_id!: number;

  @PrimaryColumn()
  group_id!: number;

}
