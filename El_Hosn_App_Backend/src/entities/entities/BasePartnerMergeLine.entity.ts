import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('base_partner_merge_line', { schema: 'public' })
export class BasePartnerMergeLine {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  wizard_id!: number | null;

  @Column({ nullable: true })
  min_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  aggr_ids!: string;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
