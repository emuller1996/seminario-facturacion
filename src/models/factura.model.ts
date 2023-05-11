import {Entity, hasMany, model, property, belongsTo} from '@loopback/repository';
import {FacturaProducto} from './factura-producto.model';
import {NewUserRequest} from './new-user-request.model';

@model()
export class Factura extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  hora: string;

  @property({
    type: 'number',
    required: true,
  })
  subtotal: number;

  @property({
    type: 'number',
    required: true,
  })
  total: number;

  @hasMany(() => FacturaProducto)
  FACTURAPRODUCTOS: FacturaProducto[];

  @belongsTo(() => NewUserRequest, {name: 'USER'})
  UserId: string;

  constructor(data?: Partial<Factura>) {
    super(data);
  }
}

export interface FacturaRelations {
  // describe navigational properties here
}

export type FacturaWithRelations = Factura & FacturaRelations;
