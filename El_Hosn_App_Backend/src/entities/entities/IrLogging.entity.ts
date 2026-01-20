import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ir_logging', { schema: 'public' })
export class IrLogging {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name!: string;

  @Column()
  type!: string;

  @Column({ nullable: true })
  dbname!: string | null;

  @Column({ nullable: true })
  level!: string | null;

  @Column()
  path!: string;

  @Column()
  func!: string;

  @Column()
  line!: string;

  @Column()
  message!: string;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
