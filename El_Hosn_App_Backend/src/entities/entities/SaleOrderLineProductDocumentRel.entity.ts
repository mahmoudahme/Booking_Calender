import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sale_order_line_product_document_rel', { schema: 'public' })
export class SaleOrderLineProductDocumentRel {
  @PrimaryColumn()
  sale_order_line_id!: number;

  @PrimaryColumn()
  product_document_id!: number;

}
