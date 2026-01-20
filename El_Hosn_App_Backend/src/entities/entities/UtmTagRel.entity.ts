import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('utm_tag_rel', { schema: 'public' })
export class UtmTagRel {
  @PrimaryColumn()
  tag_id!: number;

  @PrimaryColumn()
  campaign_id!: number;

}
