<?php

namespace App\Models;

use DateTime;
use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produto extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
    protected $fillable = ['nome_prod', 'valor_prod', 'perecivel_prod', 'vencimento_prod', 'quantidade_prod','categoria_prod'];

    // Variável onde seram armazenados os campos problemáticos
    public $problems = [];
}
