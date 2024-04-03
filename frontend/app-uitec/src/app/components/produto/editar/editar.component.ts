import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Categoria } from '../../../interfaces/categoria/categoria';
import { Produto } from '../../../interfaces/produto/produto';
import { CategoriaService } from '../../../services/categoria/categoria.service';
import { ProdutoService } from '../../../services/produto/produto.service';
import { AlertService } from '../../../_alert';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, AsyncPipe],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent implements OnInit {
  id!: number;
  produto!: Produto;
  form: FormGroup;
  categorias$ = new Observable <Categoria[]>();

  constructor(
    public produtoService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    public alertService: AlertService,
    public categoriaService: CategoriaService
  ) {
    this.form = this.formBuilder.group({
      nome_prod: ['', [Validators.required, Validators.maxLength(100)]],
      valor_prod: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      quantidade_prod: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      categoria_prod: ['', Validators.required],
      perecivel_prod: new FormControl(''),
      vencimento_prod: new FormControl(''),
    });
   }

  atualizarCategorias(){
    this.categorias$ = this.categoriaService.getAll();
  }

  ngOnInit(): void {
    this.atualizarCategorias();
    this.id = this.route.snapshot.params['id'];
    this.produtoService.find(this.id).subscribe((data: Produto)=>{
      this.produto = data;
      this.form = this.formBuilder.group({
        nome_prod:  new FormControl(this.produto.nome_prod, [ Validators.required, Validators.maxLength(100) ]),
        valor_prod: new FormControl(this.produto.valor_prod, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
        quantidade_prod: new FormControl(this.produto.quantidade_prod, [ Validators.required, Validators.pattern("^[0-9]*$") ]),
        categoria_prod: new FormControl(this.produto.categoria_prod, [ Validators.required]),
        perecivel_prod: new FormControl(this.produto.perecivel_prod == true ? 1 : 0),
        vencimento_prod: new FormControl(this.produto.vencimento_prod),
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
    });
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.produtoService.update(this.id, this.form.value).subscribe(res => {
      if(res.success){
      this.alertService.success(res.message);
      this.router.navigateByUrl('produto/listar');
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
    })
  }

}
