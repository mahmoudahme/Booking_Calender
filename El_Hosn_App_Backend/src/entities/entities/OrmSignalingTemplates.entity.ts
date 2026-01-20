import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orm_signaling_templates', { schema: 'public' })
export class OrmSignalingTemplates {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true, default: () => "now()" })
  date!: Date | null;

}
