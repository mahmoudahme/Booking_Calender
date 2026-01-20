import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_bank_statement_ir_attachment_rel', { schema: 'public' })
export class AccountBankStatementIrAttachmentRel {
  @PrimaryColumn()
  account_bank_statement_id!: number;

  @PrimaryColumn()
  ir_attachment_id!: number;

}
