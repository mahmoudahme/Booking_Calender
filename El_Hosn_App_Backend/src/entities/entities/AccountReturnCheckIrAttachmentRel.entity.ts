import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_return_check_ir_attachment_rel', { schema: 'public' })
export class AccountReturnCheckIrAttachmentRel {
  @PrimaryColumn()
  account_return_check_id!: number;

  @PrimaryColumn()
  ir_attachment_id!: number;

}
