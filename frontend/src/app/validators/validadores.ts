import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CATEGORIAS } from '../models/receita';

// igual ao required, mas não aceita só espaços
export function obrigatorio(control: AbstractControl): ValidationErrors | null {
  const valor = control.value;
  if (valor === null || valor === undefined || String(valor).trim() === '') {
    return { required: true };
  }
  return null;
}

export function categoriaValida(control: AbstractControl): ValidationErrors | null {
  const valor = control.value;
  if (!valor) {
    return null;
  }
  const existe = CATEGORIAS.some((c) => c.valor === valor);
  return existe ? null : { categoriaInvalida: true };
}

// conta as linhas preenchidas de um textarea
export function minimoLinhas(minimo: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const texto = String(control.value || '');
    const linhas = texto.split('\n').filter((l) => l.trim() !== '');
    if (linhas.length > 0 && linhas.length < minimo) {
      return { minimoLinhas: { minimo, atual: linhas.length } };
    }
    return null;
  };
}
