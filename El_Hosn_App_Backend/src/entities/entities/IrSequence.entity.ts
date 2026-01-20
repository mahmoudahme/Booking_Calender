import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ir_sequence', { schema: 'public' })
export class IrSequence {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  number_next!: number;

  @Column()
  number_increment!: number;

  @Column()
  padding!: number;

  @Column({ nullable: true })
  company_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name!: string;

  @Column({ nullable: true })
  code!: string | null;

  @Column()
  implementation!: string;

  @Column({ nullable: true })
  prefix!: string | null;

  @Column({ nullable: true })
  suffix!: string | null;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  use_date_range!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
