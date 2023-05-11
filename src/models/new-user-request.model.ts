import { User } from '@loopback/authentication-jwt';
import {Entity, model, property, hasMany} from '@loopback/repository';
import {Factura} from './factura.model';

@model()
export class NewUserRequest extends User {
  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @hasMany(() => Factura, {keyTo: 'UserId'})
  facturas: Factura[];

  constructor(data?: Partial<NewUserRequest>) {
    super(data);
  }
}

export interface NewUserRequestRelations {
  // describe navigational properties here
}

export type NewUserRequestWithRelations = NewUserRequest & NewUserRequestRelations;
