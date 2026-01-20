import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('res_groups_implied_rel', { schema: 'public' })
export class ResGroupsImpliedRel {
  @PrimaryColumn()
  gid!: number;

  @PrimaryColumn()
  hid!: number;

}
