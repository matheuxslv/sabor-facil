import { Component, OnInit, inject, signal } from '@angular/core';
import { ReceitaService } from '../../services/receita.service';
import { Receita, nomeCategoria } from '../../models/receita';

@Component({
  selector: 'app-moderacao',
  templateUrl: './moderacao.html'
})
export class Moderacao implements OnInit {
  private receitaService = inject(ReceitaService);

  pendentes = signal<Receita[]>([]);
  carregando = signal(true);
  mensagem = signal('');
  erro = signal('');
  nomeCategoria = nomeCategoria;

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.carregando.set(true);
    this.receitaService.listarPendentes().subscribe({
      next: (dados) => {
        this.pendentes.set(dados);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set('Não foi possível carregar as receitas pendentes.');
        this.carregando.set(false);
      }
    });
  }

  aprovar(receita: Receita): void {
    if (!receita.id || !confirm(`Aprovar a receita "${receita.nome}"?`)) {
      return;
    }

    this.receitaService.aprovar(receita.id).subscribe({
      next: () => {
        this.removerDaLista(receita.id!);
        this.mensagem.set(`"${receita.nome}" foi aprovada e já aparece no site.`);
      },
      error: () => this.erro.set('Erro ao aprovar a receita.')
    });
  }

  recusar(receita: Receita): void {
    if (!receita.id || !confirm(`Recusar e excluir a receita "${receita.nome}"?`)) {
      return;
    }

    this.receitaService.recusar(receita.id).subscribe({
      next: () => {
        this.removerDaLista(receita.id!);
        this.mensagem.set(`"${receita.nome}" foi recusada.`);
      },
      error: () => this.erro.set('Erro ao recusar a receita.')
    });
  }

  private removerDaLista(id: number): void {
    this.erro.set('');
    this.pendentes.update((lista) => lista.filter((r) => r.id !== id));
  }
}
