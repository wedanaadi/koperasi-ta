<?php

use App\Http\Controllers\AkunController;
use App\Http\Controllers\AngsuranController;
use App\Http\Controllers\KasController;
use App\Http\Controllers\PinjamanController;
use App\Http\Controllers\SimpananController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/kas/bukti',[KasController::class, 'cetak_bukti']);
Route::get('/simpanan/bukti',[SimpananController::class, 'cetak_bukti']);
Route::get('/pinjaman/bukti',[PinjamanController::class, 'cetak_bukti']);
Route::get('/angsuran/bukti',[AngsuranController::class, 'cetak_bukti']);
Route::get('/pinjaman/cetakreksimpanan',[SimpananController::class, 'cetak_reksimpanan']);
Route::get('/pinjaman/cetakpinjaman',[PinjamanController::class, 'cetak_pinjaman']);
Route::get('/pinjaman/riwayat',[PinjamanController::class, 'cetak_riwayatpinjaman']);
Route::get('/kas/cetak',[SimpananController::class, 'cetak_kassimpanan']);
Route::get('/kas/trxkas',[KasController::class, 'cetak_trxkas']);
Route::get('/akun/neraca',[AkunController::class, 'cetak_neraca']);
