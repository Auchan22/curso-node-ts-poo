import { Request, Response } from 'express';
import { PurchaseProductService } from '../services/purchases-product.service';
import { HttpResponse } from '../../shared/response/http.response';
import { DeleteResult, UpdateResult } from 'typeorm';

export class PurchaseProductController {
  constructor(
    private readonly purchaseProductService: PurchaseProductService = new PurchaseProductService(),
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {}
  async getPurchaseProducts(req: Request, res: Response) {
    try {
      const data = await this.purchaseProductService.findAllPurchaseProducts();
      if (!data) return this.httpResponse.NotFound(res, 'No existe el dato');
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }
  async getPurchaseProductById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.purchaseProductService.findPurchaseProductById(
        id,
      );
      if (!data) return this.httpResponse.NotFound(res, 'No existe el dato');
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }
  async createPurchaseProduct(req: Request, res: Response) {
    try {
      const data = await this.purchaseProductService.createPurchaseProduct(
        req.body,
      );
      if (!data) return this.httpResponse.NotFound(res, 'No existe el dato');
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
    }
  }
  async updatePurchaseProduct(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: UpdateResult =
        await this.purchaseProductService.updatePurchaseProduct(id, req.body);
      if (!data.affected)
        return this.httpResponse.NotFound(res, 'Hay un error al actualizar');
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }
  async deletePurchaseProduct(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: DeleteResult =
        await this.purchaseProductService.deletePurchaseProduct(id);
      if (!data.affected)
        return this.httpResponse.NotFound(res, 'Hay un error al eliminar');
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }
}
