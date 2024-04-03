<?php

namespace App\Http\Controllers;

use App\Models\Produto;
use Error;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\QueryException;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ProdutoController extends Controller
{
    public function listar_produtos(){
        $pesquisa = request("parametros");
        if(!empty($pesquisa))
            return Produto::query("SELECT * FROM produtos WHERE id = ?");
        return response()->json(Produto::leftJoin('categorias', 'categorias.id', '=', 'produtos.categoria_prod')->
                                        select( "*", 'categorias.id as cat_id', "produtos.id as id")->get()->sortBy('id')->values(), 200);
    }

    public function exibir_produto($id){
        $produto = Produto::find($id);
        if(empty($produto))
            return response()->json([
                'message' => "Falha ao encontrar produto!",
                'success' => false
            ], 200);

        return $produto;
    }

    public function adicionar_produto(Request $request, Produto $produto){
        $valid = $request->validate([
            'nome_prod' => 'required|unique:App\Models\Produto,nome_prod|max:100|string',
            'valor_prod' => 'required|decimal:0,2',
            'categoria_prod' => 'required|integer',
            'quantidade_prod' => 'required|integer',
            'vencimento_prod' => 'nullable|date_format:Y-m-d',
            'perecivel_prod' => 'nullable|bool',
        ]);
        $produto->fill($valid);
        $produto->perecivel_prod = $produto->perecivel_prod ? true : false;
        $erros = [];
        try {
            if($produto->save())
                return response()->json([
                    'message' => "Produto salvo com sucesso!",
                    'success' => true
                ], 200);
            } catch (QueryException $e){
                report($e);
                $erros['Query'] = $e;
            }

        return response()->json([
            'message' => "Falha ao salvar produto!",
            'success' => false,
            'errors' => $erros
        ], 500);
        
    }

    public function atualizar_produto(Request $request, $id){
        $valid = $request->validate([
            'nome_prod' => [
                'required', Rule::unique('produtos')->ignore($id), 'max:100', 'string'
            ],
            'valor_prod' => 'required|decimal:0,2',
            'categoria_prod' => 'required|integer',
            'quantidade_prod' => 'required|integer',
            'vencimento_prod' => 'nullable|date_format:Y-m-d',
            'perecivel_prod' => 'nullable|bool',
        ]);

        $produto = Produto::find($id);
        if(empty($produto))
            return response()->json([
                'message' => "Produto não encontrado!",
                'success' => false
            ], 200);

        $produto->fill($request->all());
        $erros = [];
        try{
            $produto->save();
            return response()->json([
                'message' => "Produto salvo com sucesso!",
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

    public function remover_produto($id){
        try{
            Produto::find($id)->delete();
            return response()->json([
                'message' => "Produto deletado com sucesso!",
                'success' => true
            ], 200);
        }catch (Error $e){
            return response()->json([
                'message' => "Falha ao deletar produto!",
                'success' => false,
                'errors' => ['Query' => 'Produto não encontrado']
            ], 500); 
        }
    }
}
