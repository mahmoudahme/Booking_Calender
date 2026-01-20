import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('html_editor_converter_test', { schema: 'public' })
export class HtmlEditorConverterTest {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  integer!: number | null;

  @Column({ nullable: true })
  many2one!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  char!: string | null;

  @Column({ nullable: true })
  selection_str!: string | null;

  @Column({ nullable: true })
  date!: Date | null;

  @Column({ nullable: true })
  html!: string | null;

  @Column({ nullable: true })
  text!: string | null;

  @Column({ nullable: true })
  numeric!: number | null;

  @Column({ nullable: true })
  datetime!: Date | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  float!: number | null;

  @Column({ nullable: true })
  binary!: string | null;

}
