import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_return_ir_attachment_rel', { schema: 'public' })
export class AccountReturnIrAttachmentRel {
  @PrimaryColumn()
  account_return_id!: number;

  @PrimaryColumn()
  ir_attachment_id!: number;

}
