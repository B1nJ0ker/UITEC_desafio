import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Categoria } from '../../../interfaces/categoria/categoria';
import { CategoriaService } from '../../../services/categoria/categoria.service';
import { ProdutoService } from '../../../services/produto/produto.service';
import { AlertService } from '../../../_alert';

@Component({
  selector: 'app-adicionar',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, AsyncPipe, NgFor],
  templateUrl: './adicionar.component.html',
  styleUrl: './adicionar.component.css'
})
export class AdicionarComponent implements OnInit{
  form: FormGroup;
  categorias$ = new Observable <Categoria[]>();

  constructor(
    public produtoService: ProdutoService,
    private router: Router,
    private formBuilder: FormBuilder,
    public alertService: AlertService,
    public categoriaService: CategoriaService
  ) {
      this.form = this.formBuilder.group({});
  }

  atualizarCategorias(){
    this.categorias$ = this.categoriaService.getAll();
  }

  ngOnInit(): void {
    this.atualizarCategorias();
    this.form = this.formBuilder.group({
      nome_prod: ['', [Validators.required, Validators.maxLength(100)]],
      valor_prod: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      quantidade_prod: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      categoria_prod: ['', Validators.required],
      perecivel_prod: new FormControl(''),
      vencimento_prod: new FormControl(''),
    });
    this.form.get('perecivel_prod')?.valueChanges.subscribe((value) => {
      const vencimentoControl = this.form.get('vencimento_prod');
      if (value) {
        vencimentoControl?.setValidators([Validators.required]);
      } else {
        vencimentoControl?.clearValidators();
      }
      vencimentoControl?.updateValueAndValidity();
    });
  }

  get fc(){
    return this.form.controls;
  }

  submit(){    
    this.produtoService.create(this.form.value).subscribe(res => {
      if(res.success){
        this.alertService.success(res.message);
        this.router.navigateByUrl('produto');
      }
      else{
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
      //console.log(res);
      
    })
  }
}
