import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('auth_passkey_key', { schema: 'public' })
export class AuthPasskeyKey {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  sign_count!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name!: string;

  @Column()
  credential_identifier!: string;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  public_key!: string | null;

}
