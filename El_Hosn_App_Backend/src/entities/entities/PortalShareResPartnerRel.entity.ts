import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('portal_share_res_partner_rel', { schema: 'public' })
export class PortalShareResPartnerRel {
  @PrimaryColumn()
  portal_share_id!: number;

  @PrimaryColumn()
  res_partner_id!: number;

}
