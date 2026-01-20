import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_document_sale_pdf_form_field_rel', { schema: 'public' })
export class ProductDocumentSalePdfFormFieldRel {
  @PrimaryColumn()
  product_document_id!: number;

  @PrimaryColumn()
  sale_pdf_form_field_id!: number;

}
