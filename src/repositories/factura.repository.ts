import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Factura, FacturaRelations, FacturaProducto, NewUserRequest} from '../models';
import {FacturaProductoRepository} from './factura-producto.repository';
import {NewUserRequestRepository} from './new-user-request.repository';

export class FacturaRepository extends DefaultCrudRepository<
  Factura,
  typeof Factura.prototype.id,
  FacturaRelations
> {

  public readonly FACTURAPRODUCTOS: HasManyRepositoryFactory<FacturaProducto, typeof Factura.prototype.id>;

  public readonly USER: BelongsToAccessor<NewUserRequest, typeof Factura.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('FacturaProductoRepository') protected facturaProductoRepositoryGetter: Getter<FacturaProductoRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<NewUserRequestRepository>,
  ) {
    super(Factura, dataSource);
    this.USER = this.createBelongsToAccessorFor('USER', userRepositoryGetter,);
    this.registerInclusionResolver('USER', this.USER.inclusionResolver);
    this.FACTURAPRODUCTOS = this.createHasManyRepositoryFactoryFor('FACTURAPRODUCTOS', facturaProductoRepositoryGetter,);
    this.registerInclusionResolver('FACTURAPRODUCTOS', this.FACTURAPRODUCTOS.inclusionResolver);
  }
}
