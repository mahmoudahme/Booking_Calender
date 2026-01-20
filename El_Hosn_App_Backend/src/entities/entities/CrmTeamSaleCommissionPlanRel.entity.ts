import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('crm_team_sale_commission_plan_rel', { schema: 'public' })
export class CrmTeamSaleCommissionPlanRel {
  @PrimaryColumn()
  crm_team_id!: number;

  @PrimaryColumn()
  sale_commission_plan_id!: number;

}
