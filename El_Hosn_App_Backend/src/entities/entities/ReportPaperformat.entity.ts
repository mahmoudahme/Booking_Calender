import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('report_paperformat', { schema: 'public' })
export class ReportPaperformat {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  page_height!: number | null;

  @Column({ nullable: true })
  page_width!: number | null;

  @Column({ nullable: true })
  header_spacing!: number | null;

  @Column()
  dpi!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name!: string;

  @Column({ nullable: true })
  format!: string | null;

  @Column({ nullable: true })
  orientation!: string | null;

  @Column({ nullable: true })
  default!: boolean | null;

  @Column({ nullable: true })
  header_line!: boolean | null;

  @Column({ nullable: true })
  disable_shrinking!: boolean | null;

  @Column({ nullable: true })
  css_margins!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  margin_top!: number | null;

  @Column({ nullable: true })
  margin_bottom!: number | null;

  @Column({ nullable: true })
  margin_left!: number | null;

  @Column({ nullable: true })
  margin_right!: number | null;

}
