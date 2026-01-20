import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('res_groups_report_rel', { schema: 'public' })
export class ResGroupsReportRel {
  @PrimaryColumn()
  uid!: number;

  @PrimaryColumn()
  gid!: number;

}
