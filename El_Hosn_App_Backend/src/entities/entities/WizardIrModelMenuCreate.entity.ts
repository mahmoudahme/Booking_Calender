import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('wizard_ir_model_menu_create', { schema: 'public' })
export class WizardIrModelMenuCreate {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  menu_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name!: string;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
