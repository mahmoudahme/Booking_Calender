import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ir_default', { schema: 'public' })
export class IrDefault {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  field_id!: number;

  @Column({ nullable: true })
  user_id!: number | null;

  @Column({ nullable: true })
  company_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  condition!: string | null;

  @Column()
  json_value!: string;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
