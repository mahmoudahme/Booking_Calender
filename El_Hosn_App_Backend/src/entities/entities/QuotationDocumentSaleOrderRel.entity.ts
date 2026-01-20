import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('quotation_document_sale_order_rel', { schema: 'public' })
export class QuotationDocumentSaleOrderRel {
  @PrimaryColumn()
  sale_order_id!: number;

  @PrimaryColumn()
  quotation_document_id!: number;

}
