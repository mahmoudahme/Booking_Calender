import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('portal_share', { schema: 'public' })
export class PortalShare {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  res_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  res_model!: string;

  @Column({ nullable: true })
  note!: string | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
