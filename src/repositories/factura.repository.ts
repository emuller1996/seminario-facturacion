import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Factura, FacturaRelations, FacturaProducto} from '../models';
import {FacturaProductoRepository} from './factura-producto.repository';

export class FacturaRepository extends DefaultCrudRepository<
  Factura,
  typeof Factura.prototype.id,
  FacturaRelations
> {

  public readonly FACTURAPRODUCTOS: HasManyRepositoryFactory<FacturaProducto, typeof Factura.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('FacturaProductoRepository') protected facturaProductoRepositoryGetter: Getter<FacturaProductoRepository>,
  ) {
    super(Factura, dataSource);
    this.FACTURAPRODUCTOS = this.createHasManyRepositoryFactoryFor('FACTURAPRODUCTOS', facturaProductoRepositoryGetter,);
    this.registerInclusionResolver('FACTURAPRODUCTOS', this.FACTURAPRODUCTOS.inclusionResolver);
  }
}
