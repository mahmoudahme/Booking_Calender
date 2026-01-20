import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('header_footer_quotation_template_rel', { schema: 'public' })
export class HeaderFooterQuotationTemplateRel {
  @PrimaryColumn()
  quotation_document_id!: number;

  @PrimaryColumn()
  sale_order_template_id!: number;

}
