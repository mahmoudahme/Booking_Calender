import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orm_signaling_registry', { schema: 'public' })
export class OrmSignalingRegistry {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true, default: () => "now()" })
  date!: Date | null;

}
