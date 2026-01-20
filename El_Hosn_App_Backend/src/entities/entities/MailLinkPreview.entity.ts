import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mail_link_preview', { schema: 'public' })
export class MailLinkPreview {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  source_url!: string;

  @Column({ nullable: true })
  og_type!: string | null;

  @Column({ nullable: true })
  og_title!: string | null;

  @Column({ nullable: true })
  og_site_name!: string | null;

  @Column({ nullable: true })
  og_image!: string | null;

  @Column({ nullable: true })
  og_mimetype!: string | null;

  @Column({ nullable: true })
  image_mimetype!: string | null;

  @Column({ nullable: true })
  og_description!: string | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
