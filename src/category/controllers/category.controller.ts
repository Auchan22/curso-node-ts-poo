import { Request, Response } from 'express';
import { CategoryService } from '../services/category.service';
import { HttpResponse } from '../../shared/response/http.response';

export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService = new CategoryService(),
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {}

  async getCategories(req: Request, res: Response) {
    try {
      const data = await this.categoryService.findAllCategoties();
      if (data.length === 0)
        return this.httpResponse.NotFound(res, 'No existe el dato');
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }
  async getCategoryById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.categoryService.findCategoryById(id);
      if (!data) return this.httpResponse.NotFound(res, 'No existe el dato');
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }
  async createCategory(req: Request, res: Response) {
    try {
      const data = await this.categoryService.createCategory(req.body);
      if (!data) return this.httpResponse.NotFound(res, 'No existe el dato');
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }
  async updateCategory(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.categoryService.updateCategory(id, req.body);
      if (!data.affected)
        return this.httpResponse.NotFound(res, 'Hay un error al actualizar');
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }
  async deleteCategory(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.categoryService.deleteCategory(id);
      if (!data.affected)
        return this.httpResponse.NotFound(res, 'Hay un error al eliminar');
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }
}
