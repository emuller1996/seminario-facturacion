import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {Factura, FacturaProducto} from '../models';
import {FacturaRepository} from '../repositories';

export class FacturaFacturaProductoController {
  constructor(
    @repository(FacturaRepository)
    protected facturaRepository: FacturaRepository,
  ) {}

  @get('/facturas/{id}/factura-productos', {
    responses: {
      '200': {
        description: 'Array of Factura has many FacturaProducto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(FacturaProducto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: string,
    @param.query.object('filter') filter?: Filter<FacturaProducto>,
  ): Promise<FacturaProducto[]> {
    return this.facturaRepository.FACTURAPRODUCTOS(id).find(filter);
  }

  @post('/facturas/{id}/factura-productos', {
    responses: {
      '200': {
        description: 'Factura model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(FacturaProducto)},
        },
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Factura.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FacturaProducto, {
            title: 'NewFacturaProductoInFactura',
            exclude: ['id'],
            optional: ['facturaId'],
          }),
        },
      },
    })
    facturaProducto: Omit<FacturaProducto, 'id'>,
  ): Promise<FacturaProducto> {
    return this.facturaRepository.FACTURAPRODUCTOS(id).create(facturaProducto);
  }

  @patch('/facturas/{id}/factura-productos', {
    responses: {
      '200': {
        description: 'Factura.FacturaProducto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FacturaProducto, {partial: true}),
        },
      },
    })
    facturaProducto: Partial<FacturaProducto>,
    @param.query.object('where', getWhereSchemaFor(FacturaProducto))
    where?: Where<FacturaProducto>,
  ): Promise<Count> {
    return this.facturaRepository
      .FACTURAPRODUCTOS(id)
      .patch(facturaProducto, where);
  }

  @del('/facturas/{id}/factura-productos', {
    responses: {
      '200': {
        description: 'Factura.FacturaProducto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: string,
    @param.query.object('where', getWhereSchemaFor(FacturaProducto))
    where?: Where<FacturaProducto>,
  ): Promise<Count> {
    return this.facturaRepository.FACTURAPRODUCTOS(id).delete(where);
  }
}
