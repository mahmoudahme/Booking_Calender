import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orm_signaling_routing', { schema: 'public' })
export class OrmSignalingRouting {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true, default: () => "now()" })
  date!: Date | null;

}
