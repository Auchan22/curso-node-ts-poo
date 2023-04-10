import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../../config/base.service';
import { PurchaseProductDTO } from '../dto/purchases-product.dto';
import { PurchasesProductsEntity } from '../entities/purchases-product.entity';

export class PurchaseProductService extends BaseService<PurchasesProductsEntity> {
  constructor() {
    super(PurchasesProductsEntity);
  }

  async findAllPurchaseProducts(): Promise<PurchasesProductsEntity[]> {
    return (await this.execRepository).find();
  }
  async findPurchaseProductById(
    id: string,
  ): Promise<PurchasesProductsEntity | null> {
    return (await this.execRepository).findOneBy({ id });
  }
  async createPurchaseProduct(
    body: PurchaseProductDTO,
  ): Promise<PurchasesProductsEntity> {
    return (await this.execRepository).save(body);
  }
  async deletePurchaseProduct(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete({ id });
  }
  async updatePurchaseProduct(
    id: string,
    infoUpdate: PurchaseProductDTO,
  ): Promise<UpdateResult> {
    return (await this.execRepository).update(id, infoUpdate);
  }
}
