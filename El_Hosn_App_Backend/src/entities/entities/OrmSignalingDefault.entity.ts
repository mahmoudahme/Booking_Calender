import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orm_signaling_default', { schema: 'public' })
export class OrmSignalingDefault {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true, default: () => "now()" })
  date!: Date | null;

}
