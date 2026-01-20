import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('properties_base_definition', { schema: 'public' })
export class PropertiesBaseDefinition {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  properties_field_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ type: 'jsonb', nullable: true })
  properties_definition!: any | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
