import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('discuss_channel_res_groups_rel', { schema: 'public' })
export class DiscussChannelResGroupsRel {
  @PrimaryColumn()
  discuss_channel_id!: number;

  @PrimaryColumn()
  res_groups_id!: number;

}
