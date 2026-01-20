import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ir_act_server_res_partner_rel', { schema: 'public' })
export class IrActServerResPartnerRel {
  @PrimaryColumn()
  ir_act_server_id!: number;

  @PrimaryColumn()
  res_partner_id!: number;

}
