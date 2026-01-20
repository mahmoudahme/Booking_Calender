import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('base_automation', { schema: 'public' })
export class BaseAutomation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  model_id!: number;

  @Column({ nullable: true })
  trg_selection_field_id!: number | null;

  @Column({ nullable: true })
  trg_field_ref!: number | null;

  @Column({ nullable: true })
  trg_date_id!: number | null;

  @Column({ nullable: true })
  trg_date_range!: number | null;

  @Column({ nullable: true })
  trg_date_calendar_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  webhook_uuid!: string | null;

  @Column({ nullable: true })
  record_getter!: string | null;

  @Column()
  trigger!: string;

  @Column({ nullable: true })
  trg_date_range_mode!: string | null;

  @Column({ nullable: true })
  trg_date_range_type!: string | null;

  @Column({ nullable: true })
  filter_pre_domain!: string | null;

  @Column({ nullable: true })
  filter_domain!: string | null;

  @Column()
  name!: any;

  @Column({ nullable: true })
  description!: string | null;

  @Column({ nullable: true })
  log_webhook_calls!: boolean | null;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  last_run!: Date | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  trg_date_resource_field_id!: number | null;

}
