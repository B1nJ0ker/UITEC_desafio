import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdicionarComponent } from '../../components/produto/adicionar/adicionar.component';
import { EditarComponent } from '../../components/produto/editar/editar.component';
import { ListarComponent } from '../../components/produto/listar/listar.component';

const routes: Routes = [
  { path: '', redirectTo: 'produto', pathMatch: 'full'},
  { path: 'produto', component: ListarComponent },
  { path: 'produto/adicionar', component: AdicionarComponent },
  { path: 'produto/editar/:id', component: EditarComponent } 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutoRoutingModule { }
