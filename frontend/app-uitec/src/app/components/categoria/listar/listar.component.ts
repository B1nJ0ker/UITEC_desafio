import { AsyncPipe, NgFor } from '@angular/common';
import { ExpressionType } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Categoria } from '../../../interfaces/categoria/categoria';
import { CategoriaService } from '../../../services/categoria/categoria.service';
import { AlertService } from '../../../_alert';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [NgFor, RouterModule, ReactiveFormsModule, AsyncPipe],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent implements OnInit {

  categorias$ = new Observable<Categoria[]>();
  form: FormGroup;
  constructor(
    public categoriaService: CategoriaService, 
    public alertService: AlertService,
    private formBuilder: FormBuilder,
    ) { this.form = this.formBuilder.group({}); }

  atualizarLista(){
    this.categorias$ = this.categoriaService.getAll();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      nome_cat:  new FormControl('', [ Validators.required, Validators.maxLength(100) ])
    });
    this.atualizarLista();
  }

  get fc(){
    return this.form.controls;
  }

  submit(){    
    this.categoriaService.create(this.form.value).subscribe(res => {
      if(res.success){
        console.log('ok')
        this.alertService.success(res.message);
        this.atualizarLista();
      }else{
        console.log('oxk')
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

  deleteCategoria(id: number){
    this.categoriaService.delete(id).subscribe(res => {
        if(res.success){
          this.alertService.success(res.message);
          this.atualizarLista();;
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
