import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('discuss_voice_metadata', { schema: 'public' })
export class DiscussVoiceMetadata {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  attachment_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
