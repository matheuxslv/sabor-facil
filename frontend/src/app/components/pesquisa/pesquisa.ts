import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReceitaService } from '../../services/receita.service';
import { Receita } from '../../models/receita';
import { ReceitaCard } from '../receita-card/receita-card';
import { obrigatorio } from '../../validators/validadores';

@Component({
  selector: 'app-pesquisa',
  imports: [ReactiveFormsModule, ReceitaCard],
  templateUrl: './pesquisa.html'
})
export class Pesquisa {
  private receitaService = inject(ReceitaService);

  form = new FormGroup({
    nome: new FormControl('', {
      nonNullable: true,
      validators: [obrigatorio, Validators.minLength(2), Validators.maxLength(50)]
    })
  });

  resultados = signal<Receita[]>([]);
  termo = signal('');
  pesquisou = signal(false);
  carregando = signal(false);
  erro = signal('');

  get nome() {
    return this.form.controls.nome;
  }

  pesquisar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const nome = this.nome.value.trim();
    this.termo.set(nome);
    this.carregando.set(true);
    this.erro.set('');

    this.receitaService.pesquisarPorNome(nome).subscribe({
      next: (dados) => {
        this.resultados.set(dados);
        this.pesquisou.set(true);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set('Erro ao pesquisar. Verifique se a API está rodando.');
        this.carregando.set(false);
      }
    });
  }
}
