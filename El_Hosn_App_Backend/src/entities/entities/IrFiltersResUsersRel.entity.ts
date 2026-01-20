import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ir_filters_res_users_rel', { schema: 'public' })
export class IrFiltersResUsersRel {
  @PrimaryColumn()
  ir_filters_id!: number;

  @PrimaryColumn()
  res_users_id!: number;

}
