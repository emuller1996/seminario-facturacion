import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {FacturaProducto, FacturaProductoRelations, Factura} from '../models';
import {FacturaRepository} from './factura.repository';

export class FacturaProductoRepository extends DefaultCrudRepository<
  FacturaProducto,
  typeof FacturaProducto.prototype.id,
  FacturaProductoRelations
> {

  public readonly FACTURA: BelongsToAccessor<Factura, typeof FacturaProducto.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>,
  ) {
    super(FacturaProducto, dataSource);
    this.FACTURA = this.createBelongsToAccessorFor('FACTURA', facturaRepositoryGetter,);
    this.registerInclusionResolver('FACTURA', this.FACTURA.inclusionResolver);
  }
}
