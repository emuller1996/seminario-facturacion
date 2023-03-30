import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  FacturaProducto,
  Factura,
} from '../models';
import {FacturaProductoRepository} from '../repositories';

export class FacturaProductoFacturaController {
  constructor(
    @repository(FacturaProductoRepository)
    public facturaProductoRepository: FacturaProductoRepository,
  ) { }

  @get('/factura-productos/{id}/factura', {
    responses: {
      '200': {
        description: 'Factura belonging to FacturaProducto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Factura)},
          },
        },
      },
    },
  })
  async getFactura(
    @param.path.number('id') id: typeof FacturaProducto.prototype.id,
  ): Promise<Factura> {
    return this.facturaProductoRepository.FACTURA(id);
  }
}
