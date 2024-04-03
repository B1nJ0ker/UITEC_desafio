<?php

use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ProdutoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/', [ProdutoController::class, 'listar_produtos']);
Route::get('/produto', [ProdutoController::class, 'listar_produtos']);

Route::get('/produto/{id}', [ProdutoController::class, 'exibir_produto']);

Route::post('/produto', [ProdutoController::class, 'adicionar_produto']);

Route::put('/produto/{id}', [ProdutoController::class, 'atualizar_produto']);

Route::delete('/produto/{id}', [ProdutoController::class, 'remover_produto']);
 
### 
Route::get('/categoria', [CategoriaController::class, 'listar_categoria']);

Route::post('/categoria', [CategoriaController::class, 'adicionar_categoria']);

Route::delete('/categoria/{id}', [CategoriaController::class, 'remover_categoria']);