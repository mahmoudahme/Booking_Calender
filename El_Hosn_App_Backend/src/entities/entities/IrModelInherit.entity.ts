import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ir_model_inherit', { schema: 'public' })
export class IrModelInherit {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  model_id!: number;

  @Column()
  parent_id!: number;

  @Column({ nullable: true })
  parent_field_id!: number | null;

}
