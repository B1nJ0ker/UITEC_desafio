# Desafio UITEC
* ### Descrição
Uma plataforma capaz de manipular produtos, suas categorias e demais atributos de forma simples. Sendo assim é possível visualizar uma lista de produtos e seus atributos, cadastrar produtos e categorias, excluir produtos e categoria, e alterar os atributos de um produto. As validações utilizadas tanto no lado do cliente quanto do servidor garantem a integridade dos dados.

# Requisitos
 * PHP 8.2+
 * Composer 2.5.5+
 * Postgres 13+
 * Node 20.12.0
 * npm 10.5.0+
 * Angular 17.32

# Bibliotecas Externas 
* #### [Bootstrap](https://getbootstrap.com/)
Toolkit muito utilizado pela sua praticidade no desenvolvimento de interfaces.
* #### [angular-10-alert-notifications](https://getbootstrap.com/)
Uma biblioteca antiga mas que cumpre de maneira eficiente seu papel de exibir alertas de forma simples. 

# Backend

## Funcionalidades
* ### Endpoints e suas funções
A aplicação conta com 8 endpoints sendo 5 relacionados ao manuseio de produtos e 3 para as categorias. São eles:

1. ```/api/produto``` (GET): Permite listar todos os produtos já cadastrados e seus atributos;
2. ```/api/produto/{id}```  (GET): Exibe os dados de um produto especificado pelo ```{id}```;
3. ```/api/produto``` (POST): Permite cadastrar um novo produto;
4. ```/api/produto/{id}``` (PUT): Modifica os atributos de um produto identificado pelo ```{id}```;
5. ```/api/produto/{id}``` (DELETE): Remove o produto especificado pelo ```{id}```;
6. ```/api/categoria``` (GET): Lista todas as categorias já cadastradas;
7. ```/api/categoria``` (POST): Cadastra uma nova categoria; e
8. ```/api/categoria/{id}``` (DELETE): Remove a categoria especificada pelo ```{id}```.

* ### Validação dos dados:
No backend a validação é feita pelo próprio Laravel tanto durante o cadastro quanto a atualização em qualquer modelo, retornando um erro ```422``` no caso de inconformidade com exigido.

## Instalação
* ### Banco de dados
Instalar o Postgres 13 ou superior.

Criar o banco de dados no Postgres: 
```sql
CREATE DATABASE nome_do_banco
```

* ### PHP
 Após instalar o php 8.2 ou superior. No arquivo ```php.ini``` descomente as seguintes linhas:
```
extension=pdo_pgsql
extension=zip
```

* ### Composer
Baixar e instalar o composer ( Lembre-se de apontar para o path correto do php )

Rode ```composer install``` na pasta ```backend``` do projeto para Instalar todas as dependências 

## Configuração
* ### Configurar a conexão com o banco de dados
Renomeio o arquivo ```.env.example``` para ```.env```

No bloco ```DB_CONNECTION``` insira as informações corretas do seu banco de dados.

```
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=nome_do_banco_dedados
DB_USERNAME=nome_do_usuario_do_banco_de_dados
DB_PASSWORD=senha_do_banco_de_dados
```
* ### Inicializar o banco com ```artisan```
```
php artisan migrate
```

* ### Iniciar servidor
```
php artisan serve
```

# Frontend
## Funcionalidades
* ### Páginas 
Existem ao todo 4 páginas, sendo elas:
 
1. ```/produto```: Permite listar todos os produtos já cadastrados e seus atributos, e ainda remover um produto específico;
2. ```/produto/adicionar```: Exibe um formulário para o cadastro de um novo produto;
3. ```/produto/editar/{id}```: Exibe um formulário com as informações do produto passado pelo ```{id}``` e permite a edição e salvamento dessas informações; e
4. ```/categoria```: Permite listar todas as categorias já cadastradas e seus atributos, e ainda remover ou criar uma categoria específica. *Lembrando que caso uma categoria seja removida serão também todos os produtos que pertencem a ela*.

* ### Validação dos formulários
Os dados dos formulários são validados pelo ```Validators``` do Angular que não permite o envio da requisição enquanto os dados passados não corresponderem com as exigências e notifica a inconformidade de forma eficiente. Por exemplo, a data de vencimento só é obrigatória caso o produto seja perecível.

## Instalação
* ### Node
Baixar e instalar o NodeJS (**Ainda não execute o ```npm install```**)

* ### Angular
Na pasta ```frontend/app-uitec``` instale o Angular com o comando ```npm install -g @angular/cli```

### Configuração
* #### Dependências
Ainda na pasta ```frontend/app-uitec``` instale todas as dependências com o comando ```npm install```

* #### Configurar a URL da API
No arquivo ```frontend/app-uitec/src/common/general.config.ts``` edite a URL caso seja necessário:
```bash
public static apiURL: string = "http://URL_DO_BACKEND/";      
```
* ### Iniciar servidor
```
ng serve
```