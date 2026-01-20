import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ir_module_category', { schema: 'public' })
export class IrModuleCategory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  parent_id!: number | null;

  @Column()
  name!: any;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column({ nullable: true })
  description!: any | null;

  @Column({ nullable: true })
  visible!: boolean | null;

  @Column({ nullable: true })
  exclusive!: boolean | null;

}
