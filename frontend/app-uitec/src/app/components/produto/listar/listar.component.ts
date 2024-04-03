import { AsyncPipe, DatePipe, NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Produto } from '../../../interfaces/produto/produto';
import { ProdutoService } from '../../../services/produto/produto.service';
import { AlertService } from '../../../_alert';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [NgFor, RouterModule, DatePipe, AsyncPipe],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent implements OnInit {
  produtos$ = new Observable<Produto[]>();

  constructor(public produtoService: ProdutoService, public alertService: AlertService) { }
  
  atualizarLista(){
    this.produtos$ = this.produtoService.getAll();
  }

  ngOnInit(): void {
    this.atualizarLista();
  }

  deleteProduto(id: number){
    this.produtoService.delete(id).subscribe(res => {
        if(res.success){
          this.alertService.success(res.message);
          this.atualizarLista();
        }else{
          let problemString = "";
          if(res.errors){
            problemString = "<ul>";
            res.errors.forEach(element => {
              problemString += "<il>"+element+"<il>";
            });
            problemString += "</ul>";
          }
          this.alertService.error(res.message+problemString);
        }
        console.log(res);
    })
  }
}
