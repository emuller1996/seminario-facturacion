import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Categoria} from './categoria.model';

@model({
  settings: {
    foreignKeys: {
      FK_PRODUCTO_ID_CATEGORIA: {
        name: 'FK_PRODUCTO_ID_CATEGORIA',
        entity: 'Categoria',
        entityKey: 'id',
        foreignKey: 'categoriaId'
      }
    }
  }
})
export class Producto extends Entity {
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
    type: 'string',
    required: true,
  })
  detalle: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'number',
    required: true,
  })
  costo: number;

  @property({
    type: 'boolean',
    required: true,
  })
  estado: boolean;

  @property({
    type: 'number',
    required: true,
  })
  existencias: number;

  @property({
    type: 'date',
    required: true,
  })
  fechaCreacion: string;

  @belongsTo(() => Categoria, {name: 'CATEGORIA'})
  categoriaId: number;

  constructor(data?: Partial<Producto>) {
    super(data);
  }
}

export interface ProductoRelations {
  // describe navigational properties here
}

export type ProductoWithRelations = Producto & ProductoRelations;
