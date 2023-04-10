import { IsNotEmpty } from 'class-validator';
import { BaseDTO } from '../../config/base.dto';
import { CustomerEntity } from '../../customers/entities/customer.entity';

export class PurchaseDTO extends BaseDTO {
  @IsNotEmpty()
  status!: string;

  @IsNotEmpty()
  paymentMethod!: string;

  @IsNotEmpty()
  customer!: CustomerEntity;
}
