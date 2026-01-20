import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ir_model_relation', { schema: 'public' })
export class IrModelRelation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  model!: number;

  @Column()
  module!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name!: string;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  create_date!: Date | null;

}
