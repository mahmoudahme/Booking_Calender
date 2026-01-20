import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sms_composer', { schema: 'public' })
export class SmsComposer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  res_id!: number | null;

  @Column({ nullable: true })
  template_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  composition_mode!: string;

  @Column({ nullable: true })
  res_model!: string | null;

  @Column({ nullable: true })
  res_ids!: string | null;

  @Column({ nullable: true })
  recipient_single_number_itf!: string | null;

  @Column({ nullable: true })
  number_field_name!: string | null;

  @Column({ nullable: true })
  numbers!: string | null;

  @Column()
  body!: string;

  @Column({ nullable: true })
  mass_keep_log!: boolean | null;

  @Column({ nullable: true })
  mass_force_send!: boolean | null;

  @Column({ nullable: true })
  use_exclusion_list!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
