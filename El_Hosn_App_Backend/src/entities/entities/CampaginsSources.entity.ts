import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('campagins_sources', { schema: 'public' })
export class CampaginsSources {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  name!: string | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
