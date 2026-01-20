import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ir_act_server_webhook_field_rel', { schema: 'public' })
export class IrActServerWebhookFieldRel {
  @PrimaryColumn()
  server_id!: number;

  @PrimaryColumn()
  field_id!: number;

}
