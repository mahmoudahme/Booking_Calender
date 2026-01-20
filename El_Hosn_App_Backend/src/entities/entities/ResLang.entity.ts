import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('res_lang', { schema: 'public' })
export class ResLang {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name!: string;

  @Column()
  code!: string;

  @Column({ nullable: true })
  iso_code!: string | null;

  @Column()
  url_code!: string;

  @Column()
  direction!: string;

  @Column()
  date_format!: string;

  @Column()
  time_format!: string;

  @Column()
  week_start!: string;

  @Column()
  grouping!: string;

  @Column()
  decimal_point!: string;

  @Column({ nullable: true })
  thousands_sep!: string | null;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
