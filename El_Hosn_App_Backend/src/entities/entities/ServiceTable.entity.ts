import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('service_table', { schema: 'public' })
export class ServiceTable {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: true })
    product_id!: number | null;

    @Column({ nullable: true })
    rec_id!: number | null;

    @Column({ nullable: true })
    branch_id!: number | null;

    @Column({ type: 'numeric', nullable: true })
    quantity!: number | null;

    @Column({ type: 'numeric', nullable: true })
    sale_price!: number | null;

    @Column({ type: 'numeric', nullable: true })
    discount_price!: number | null;

    @Column({ type: 'numeric', nullable: true })
    available_quantity!: number | null;

    @Column({ nullable: true })
    unit!: string | null;

    @Column({ nullable: true })
    body_part_id!: number | null;

    @Column({ nullable: true })
    create_uid!: number | null;

    @Column({ nullable: true })
    write_uid!: number | null;

    @Column({ nullable: true })
    create_date!: Date | null;

    @Column({ nullable: true })
    write_date!: Date | null;
}
