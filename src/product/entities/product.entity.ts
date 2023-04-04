import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { CategoryEntity } from '../../category/entities/category.entity';
import { PurchasesProductsEntity } from '../../custom/entities/purchases-product.entity';

@Entity({ name: 'product' })
export class ProductEntity extends BaseEntity {
  @Column()
  productNam!: string;

  @Column()
  description!: string;

  @Column()
  price!: number;

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category!: CategoryEntity;

  @OneToMany(
    () => PurchasesProductsEntity,
    (purchaseProduct) => purchaseProduct.product,
  )
  purchaseProduct!: PurchasesProductsEntity[];
}
