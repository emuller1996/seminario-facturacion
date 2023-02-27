import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Producto, ProductoRelations, Categoria} from '../models';
import {CategoriaRepository} from './categoria.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.id,
  ProductoRelations
> {

  public readonly CATEGORIA: BelongsToAccessor<Categoria, typeof Producto.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('CategoriaRepository') protected categoriaRepositoryGetter: Getter<CategoriaRepository>,
  ) {
    super(Producto, dataSource);
    this.CATEGORIA = this.createBelongsToAccessorFor('CATEGORIA', categoriaRepositoryGetter,);
    this.registerInclusionResolver('CATEGORIA', this.CATEGORIA.inclusionResolver);
  }
}
