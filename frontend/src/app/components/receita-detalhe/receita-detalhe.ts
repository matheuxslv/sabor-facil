import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ReceitaService } from '../../services/receita.service';
import { Receita, nomeCategoria } from '../../models/receita';

@Component({
  selector: 'app-receita-detalhe',
  imports: [RouterLink],
  templateUrl: './receita-detalhe.html'
})
export class ReceitaDetalhe implements OnInit {
  private route = inject(ActivatedRoute);
  private receitaService = inject(ReceitaService);

  receita = signal<Receita | null>(null);
  carregando = signal(true);
  erro = signal('');
  nomeCategoria = nomeCategoria;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isInteger(id) || id < 1) {
      this.erro.set('Receita não encontrada.');
      this.carregando.set(false);
      return;
    }

    this.receitaService.buscarPorId(id).subscribe({
      next: (dados) => {
        this.receita.set(dados);
        this.carregando.set(false);
      },
      error: (e: HttpErrorResponse) => {
        this.erro.set(e.status === 404 ? 'Receita não encontrada.' : 'Erro ao carregar a receita.');
        this.carregando.set(false);
      }
    });
  }
}
