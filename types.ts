import React from 'react';

export interface Contact {
  id: string;
  name: string;
  cpf: string;
  phone: string;
  createdAt: Date;
}

export type InputEvent = React.ChangeEvent<HTMLInputElement>;
export type FormEvent = React.FormEvent<HTMLFormElement>;