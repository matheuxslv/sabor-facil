import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReceitaService } from '../../services/receita.service';
import { CATEGORIAS, Categoria, Receita } from '../../models/receita';
import { categoriaValida, minimoLinhas, obrigatorio } from '../../validators/validadores';

@Component({
  selector: 'app-nova-receita',
  imports: [ReactiveFormsModule],
  templateUrl: './nova-receita.html'
})
export class NovaReceita {
  private receitaService = inject(ReceitaService);

  categorias = CATEGORIAS;
  enviando = signal(false);
  sucesso = signal('');
  erro = signal('');

  form = new FormGroup({
    nome: new FormControl('', {
      nonNullable: true,
      validators: [obrigatorio, Validators.minLength(3), Validators.maxLength(80)]
    }),
    categoria: new FormControl('', {
      nonNullable: true,
      validators: [obrigatorio, categoriaValida]
    }),
    autor: new FormControl('', {
      nonNullable: true,
      validators: [Validators.maxLength(50)]
    }),
    tempoPreparo: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
      Validators.max(600),
      Validators.pattern(/^\d+$/)
    ]),
    porcoes: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
      Validators.max(50),
      Validators.pattern(/^\d+$/)
    ]),
    ingredientes: new FormControl('', {
      nonNullable: true,
      validators: [obrigatorio, minimoLinhas(2)]
    }),
    modoPreparo: new FormControl('', {
      nonNullable: true,
      validators: [obrigatorio, Validators.minLength(20)]
    })
  });

  get campos() {
    return this.form.controls;
  }

  invalido(campo: string): boolean {
    const controle = this.form.get(campo);
    return !!controle && controle.invalid && controle.touched;
  }

  enviar(): void {
    this.sucesso.set('');
    this.erro.set('');

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.erro.set('Confira os campos destacados antes de enviar.');
      return;
    }

    const valores = this.form.getRawValue();

    const receita = new Receita();
    receita.nome = valores.nome.trim();
    receita.categoria = valores.categoria as Categoria;
    receita.autor = valores.autor.trim();
    receita.tempoPreparo = Number(valores.tempoPreparo);
    receita.porcoes = Number(valores.porcoes);
    receita.ingredientes = valores.ingredientes
      .split('\n')
      .map((item) => item.trim())
      .filter((item) => item !== '');
    receita.modoPreparo = valores.modoPreparo.trim();

    this.enviando.set(true);

    this.receitaService.cadastrar(receita).subscribe({
      next: () => {
        this.sucesso.set('Receita enviada! Ela vai aparecer no site depois de ser aprovada.');
        this.form.reset();
        this.enviando.set(false);
      },
      error: () => {
        this.erro.set('Não foi possível enviar a receita. Tente novamente.');
        this.enviando.set(false);
      }
    });
  }
}
