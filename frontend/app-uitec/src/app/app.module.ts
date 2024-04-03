import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProdutoModule } from './modules/produto/produto.module';
import { HttpClientModule } from '@angular/common/http';

import { AlertModule  } from "./_alert";
import { CategoriaModule } from './modules/categoria/categoria.module';

@NgModule({
  declarations: [
    AppComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProdutoModule,
    CategoriaModule,
    HttpClientModule,
    NgbModule,
    AlertModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
