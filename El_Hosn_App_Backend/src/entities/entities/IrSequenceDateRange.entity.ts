import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ir_sequence_date_range', { schema: 'public' })
export class IrSequenceDateRange {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  sequence_id!: number;

  @Column()
  number_next!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  date_from!: Date;

  @Column()
  date_to!: Date;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
