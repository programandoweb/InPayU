<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Users\UserController;
use App\Http\Controllers\Products\CategoriesController;
use App\Http\Controllers\Content\ContentController;
use App\Http\Controllers\Products\ProductsController;
use App\Http\Controllers\Home\HomeController;
use App\Http\Controllers\MultimediaController;
use App\Http\Controllers\Scrapping\ScrappingController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

  Route::get('/', function () {
    return view('pagoslocales');
  });

  

  Route::prefix('v1')->group(function () {

    Route::get('/', [HomeController::class, 'home']);
    Route::get('/contacto', [ContentController::class, 'contacto']);

    Route::prefix('categorias')->group(function () {
      Route::get('{id}', [CategoriesController::class, 'productosXCategoria']);
      Route::get('{category}/{slug}', [CategoriesController::class, 'productoXSlug']);
    });

    Route::prefix('freeZone')->group(function () {
      Route::get('main', [HomeController::class, 'main']);
      Route::get('home', [HomeController::class, 'home']);
      Route::get('getCategories', [CategoriesController::class, 'getCategories']);
    });

    Route::post('dashboard', [AuthController::class, 'login']);
    Route::get('auth/login', [AuthController::class, 'auth_texts']);
    Route::post('auth/login', [AuthController::class, 'login']);
    Route::post('auth/login/{id}', [AuthController::class, 'loginWithToken']);

    Route::group(['middleware' => 'auth:sanctum'], function () {
      Route::post('auth/exit',[AuthController::class, 'exit']);
    });

    Route::middleware('auth:sanctum')->group(function () {

        Route::prefix('dashboard/scraping')->group(function () {

          Route::get('categorias/list', [ScrappingController::class, 'get']);
          Route::get('categorias/list/{id}', [ScrappingController::class, 'getScrappingNew']);
        //  Route::get('categorias/result', [ScrappingController::class, 'getResult']);

        });

        Route::prefix('dashboard/productos')->group(function () {

          Route::post('categorias/list/{slug}', [CategoriesController::class, 'save']);
          Route::get('categorias/list/{id}', [CategoriesController::class, 'categoria']);


          Route::get('productos/list/{id}', [ProductsController::class, 'producto']);
          Route::post('productos/list/{id}', [ProductsController::class, 'save_producto']);
          Route::post('productos/uploadfile', [MultimediaController::class, 'save_producto']);
          Route::post('productos/editfile', [MultimediaController::class, 'edit_file_producto']);
          Route::post('publicaciones/list/add', [MultimediaController::class, 'banner_add']);
          Route::post('publicaciones2/list/add', [MultimediaController::class, 'banner_add2']);
        });
    });

  });

  Route::middleware('auth:sanctum')->group(function () {

      Route::prefix('dashboard/scraping')->group(function () {


        Route::get('categorias/result', [ScrappingController::class, 'getResult']);
        Route::post('categorias/result/delete', [ScrappingController::class, 'deleteResult']);

      });

      Route::prefix('multimedia')->group(function () {
        Route::post('uploadfile', [MultimediaController::class, 'uploadfile']);
        Route::get('/', [MultimediaController::class, 'list']);
        Route::post('/', [MultimediaController::class, 'create']);
      });

      Route::prefix('dashboard/productos')->group(function () {
        Route::get('categorias/list', [CategoriesController::class, 'categorias']);
        Route::post('categorias/list/delete', [CategoriesController::class, 'delete']);

        Route::post('productos/list/delete', [ProductsController::class, 'delete_producto']);
        Route::get('productos/list', [ProductsController::class, 'productos']);
        Route::get('productos/list/{id}', [ProductsController::class, 'producto']);
        Route::get('publicaciones/list', [ProductsController::class, 'publicaciones']);
        Route::post('publicaciones/list/delete', [MultimediaController::class, 'banner_delete']);

        Route::get('publicaciones2/list', [ProductsController::class, 'publicaciones2']);
        Route::post('publicaciones2/list/delete', [MultimediaController::class, 'banner_delete']);

      });
  });


  Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
      return $request->user();
  });
