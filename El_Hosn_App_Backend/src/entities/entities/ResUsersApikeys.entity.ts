import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('res_users_apikeys', { schema: 'public' })
export class ResUsersApikeys {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  user_id!: number;

  @Column({ nullable: true })
  scope!: string | null;

  @Column({ nullable: true })
  expiration_date!: Date | null;

  @Column({ nullable: true, length: 8 })
  index!: string | null;

  @Column({ nullable: true })
  key!: string | null;

  @Column({ nullable: true, default: () => "(now() AT TIME ZONE 'utc'::text)" })
  create_date!: Date | null;

}
