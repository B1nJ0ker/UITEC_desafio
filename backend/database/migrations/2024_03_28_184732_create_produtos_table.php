<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('produtos', function (Blueprint $table) {
            $table->id();
            $table->string('nome_prod', 100)->unique()->nullable(false);
            $table->float('valor_prod', 2)->nullable(false);
            $table->date('vencimento_prod')->nullable(true);
            $table->integer('quantidade_prod')->nullable(false)->default(0);
            $table->boolean('perecivel_prod')->nullable(false)->default(false);
            $table->integer('categoria_prod')->nullable(false);
            $table->foreign('categoria_prod')->references('id')->on('categorias')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produtos');
    }
};
