import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaRoutingModule } from './categoria-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CategoriaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class CategoriaModule { }
