import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {NewUserRequest, NewUserRequestRelations, Factura} from '../models';
import {FacturaRepository} from './factura.repository';

export class NewUserRequestRepository extends DefaultCrudRepository<
NewUserRequest,
  typeof NewUserRequest.prototype.id,
  NewUserRequestRelations
> {

  public readonly facturas: HasManyRepositoryFactory<Factura, typeof NewUserRequest.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>,
  ) {
    super(NewUserRequest, dataSource);
    this.facturas = this.createHasManyRepositoryFactoryFor('facturas', facturaRepositoryGetter,);
    this.registerInclusionResolver('facturas', this.facturas.inclusionResolver);
  }
}
