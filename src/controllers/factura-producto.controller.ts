import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {FacturaProducto} from '../models';
import {FacturaProductoRepository} from '../repositories';

export class FacturaProductoController {
  constructor(
    @repository(FacturaProductoRepository)
    public facturaProductoRepository : FacturaProductoRepository,
  ) {}

  @post('/factura-productos')
  @response(200, {
    description: 'FacturaProducto model instance',
    content: {'application/json': {schema: getModelSchemaRef(FacturaProducto)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FacturaProducto, {
            title: 'NewFacturaProducto',
            exclude: ['id'],
          }),
        },
      },
    })
    facturaProducto: Omit<FacturaProducto, 'id'>,
  ): Promise<FacturaProducto> {
    return this.facturaProductoRepository.create(facturaProducto);
  }

  @get('/factura-productos/count')
  @response(200, {
    description: 'FacturaProducto model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(FacturaProducto) where?: Where<FacturaProducto>,
  ): Promise<Count> {
    return this.facturaProductoRepository.count(where);
  }

  @get('/factura-productos')
  @response(200, {
    description: 'Array of FacturaProducto model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(FacturaProducto, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(FacturaProducto) filter?: Filter<FacturaProducto>,
  ): Promise<FacturaProducto[]> {
    return this.facturaProductoRepository.find(filter);
  }

  @patch('/factura-productos')
  @response(200, {
    description: 'FacturaProducto PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FacturaProducto, {partial: true}),
        },
      },
    })
    facturaProducto: FacturaProducto,
    @param.where(FacturaProducto) where?: Where<FacturaProducto>,
  ): Promise<Count> {
    return this.facturaProductoRepository.updateAll(facturaProducto, where);
  }

  @get('/factura-productos/{id}')
  @response(200, {
    description: 'FacturaProducto model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(FacturaProducto, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(FacturaProducto, {exclude: 'where'}) filter?: FilterExcludingWhere<FacturaProducto>
  ): Promise<FacturaProducto> {
    return this.facturaProductoRepository.findById(id, filter);
  }

  @patch('/factura-productos/{id}')
  @response(204, {
    description: 'FacturaProducto PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FacturaProducto, {partial: true}),
        },
      },
    })
    facturaProducto: FacturaProducto,
  ): Promise<void> {
    await this.facturaProductoRepository.updateById(id, facturaProducto);
  }

  @put('/factura-productos/{id}')
  @response(204, {
    description: 'FacturaProducto PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() facturaProducto: FacturaProducto,
  ): Promise<void> {
    await this.facturaProductoRepository.replaceById(id, facturaProducto);
  }

  @del('/factura-productos/{id}')
  @response(204, {
    description: 'FacturaProducto DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.facturaProductoRepository.deleteById(id);
  }
}
