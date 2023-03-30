import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Factura} from './factura.model';

@model()
export class FacturaProducto extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'number',
    required: true,
  })
  idProducto: number;

  @property({
    type: 'number',
    required: true,
  })
  valorUnitario: number;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'number',
    required: true,
  })
  valorTotal: number;

  @belongsTo(() => Factura, {name: 'FACTURA'})
  facturaId: string;

  constructor(data?: Partial<FacturaProducto>) {
    super(data);
  }
}

export interface FacturaProductoRelations {
  // describe navigational properties here
}

export type FacturaProductoWithRelations = FacturaProducto &
  FacturaProductoRelations;
