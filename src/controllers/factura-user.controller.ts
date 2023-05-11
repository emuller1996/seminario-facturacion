import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Factura,
  NewUserRequest,
} from '../models';
import {FacturaRepository} from '../repositories';

export class FacturaUserController {
  constructor(
    @repository(FacturaRepository)
    public facturaRepository: FacturaRepository,
  ) { }

  @get('/facturas/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Factura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(NewUserRequest)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof Factura.prototype.id,
  ): Promise<NewUserRequest> {
    return this.facturaRepository.USER(id);
  }
}
