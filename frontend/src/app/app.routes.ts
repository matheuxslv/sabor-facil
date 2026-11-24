import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { ReceitaDetalhe } from './components/receita-detalhe/receita-detalhe';
import { Pesquisa } from './components/pesquisa/pesquisa';
import { NovaReceita } from './components/nova-receita/nova-receita';
import { Moderacao } from './components/moderacao/moderacao';

export const routes: Routes = [
  { path: '', component: Home, title: 'Sabor Fácil' },
  { path: 'receita/:id', component: ReceitaDetalhe, title: 'Receita | Sabor Fácil' },
  { path: 'pesquisa', component: Pesquisa, title: 'Pesquisar | Sabor Fácil' },
  { path: 'nova-receita', component: NovaReceita, title: 'Enviar receita | Sabor Fácil' },
  { path: 'moderacao', component: Moderacao, title: 'Moderação | Sabor Fácil' },
  { path: '**', redirectTo: '' }
];
