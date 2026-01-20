import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orm_signaling_groups', { schema: 'public' })
export class OrmSignalingGroups {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true, default: () => "now()" })
  date!: Date | null;

}
