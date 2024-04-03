<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Error;
use Illuminate\Database\QueryException;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Http\Request;

class CategoriaController extends Controller
{
    public function adicionar_categoria(Request $request){
        $valid = $request->validate([
            'nome_cat' => 'required|unique:App\Models\Categoria,nome_cat|max:100|string',
        ]);
        $erros =[];
        $categoria = new  Categoria;
        $categoria->nome_cat = $valid['nome_cat'];
        try {
            if($categoria->save())
                return response()->json([
                    'message' => "Categoria salva com Sucesso!",
                    'success' => true
                ], 200);
        } catch (QueryException $e){
            report($e);
            $erros['Query'] = "Query Exception";
        }
        
        return response()->json([
            'message' => "Falha ao salvar produto!",
            'success' => false,
            'errors' => $erros
        ], 500);
    
    }

    public function listar_categoria(){
        return response()->json(Categoria::all()->sortBy('id')->values(), 200);
    }

    public function remover_categoria($id){
        try{
            Categoria::find($id)->delete();
            return response()->json([
                'message' => "Categoria deletada com sucesso!",
                'success' => true
            ], 200);
        }catch (Error $e){
            return response()->json([
                'message' => "Falha ao deletar categoria!",
                'success' => false,
                'errors' => ['Query' => 'Categoria não encontrada']
            ], 500); 
        }
    }
}
