import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ir_model_fields', { schema: 'public' })
export class IrModelFields {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  relation_field_id!: number | null;

  @Column()
  model_id!: number;

  @Column({ nullable: true })
  related_field_id!: number | null;

  @Column({ nullable: true })
  size!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name!: string;

  @Column()
  model!: string;

  @Column({ nullable: true })
  relation!: string | null;

  @Column({ nullable: true })
  relation_field!: string | null;

  @Column()
  ttype!: string;

  @Column({ nullable: true })
  related!: string | null;

  @Column({ nullable: true })
  translate!: string | null;

  @Column()
  state!: string;

  @Column({ nullable: true })
  on_delete!: string | null;

  @Column({ nullable: true })
  domain!: string | null;

  @Column({ nullable: true })
  relation_table!: string | null;

  @Column({ nullable: true })
  column1!: string | null;

  @Column({ nullable: true })
  column2!: string | null;

  @Column({ nullable: true })
  depends!: string | null;

  @Column({ nullable: true })
  currency_field!: string | null;

  @Column({ type: 'jsonb' })
  field_description!: any;

  @Column({ type: 'jsonb', nullable: true })
  help!: any | null;

  @Column({ nullable: true })
  compute!: string | null;

  @Column({ nullable: true })
  copied!: boolean | null;

  @Column({ nullable: true })
  required!: boolean | null;

  @Column({ nullable: true })
  readonly!: boolean | null;

  @Column({ nullable: true })
  index!: boolean | null;

  @Column({ nullable: true })
  company_dependent!: boolean | null;

  @Column({ nullable: true })
  group_expand!: boolean | null;

  @Column({ nullable: true })
  selectable!: boolean | null;

  @Column({ nullable: true })
  store!: boolean | null;

  @Column({ nullable: true })
  sanitize!: boolean | null;

  @Column({ nullable: true })
  sanitize_overridable!: boolean | null;

  @Column({ nullable: true })
  sanitize_tags!: boolean | null;

  @Column({ nullable: true })
  sanitize_attributes!: boolean | null;

  @Column({ nullable: true })
  sanitize_style!: boolean | null;

  @Column({ nullable: true })
  sanitize_form!: boolean | null;

  @Column({ nullable: true })
  strip_style!: boolean | null;

  @Column({ nullable: true })
  strip_classes!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  tracking!: number | null;

}
