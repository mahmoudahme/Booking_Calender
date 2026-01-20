import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('room_model', { schema: 'public' })
export class RoomModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  capacity!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name!: string;

  @Column()
  room_code!: string;

  @Column()
  room_type!: string;

  @Column({ nullable: true })
  location!: string | null;

  @Column({ nullable: true })
  notes!: string | null;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
