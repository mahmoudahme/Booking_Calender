import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('quotation_document_sale_pdf_form_field_rel', { schema: 'public' })
export class QuotationDocumentSalePdfFormFieldRel {
  @PrimaryColumn()
  quotation_document_id!: number;

  @PrimaryColumn()
  sale_pdf_form_field_id!: number;

}
