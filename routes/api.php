<?php

use App\Http\Controllers\AkunController;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\BiayaAdminController;
use App\Http\Controllers\JenisSimpananController;
use App\Http\Controllers\KasController;
use App\Http\Controllers\LamaAngsuranController;
use App\Http\Controllers\MarketingController;
use App\Http\Controllers\NasabahController;
use App\Http\Controllers\PegawaiController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\SimpananController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/hello', function () {
  return response()->json('Hello Frontend from Backend', 200);
});

// Route::get("/pegawai",[PegawaiController::class, 'index'])->name('getPegawais');
// Route::post("/pegawai",[PegawaiController::class, 'store'])->name('createPegawais');
Route::post("/login", [AuthenticationController::class, 'login'])->name('login');
Route::get("/jenissimpanan", [JenisSimpananController::class, 'index'])->name('getJenisSimpanan');
Route::get("/jenisSimpananForSelect", [JenisSimpananController::class, 'list_select'])->name('getListJenisSimpanan');
Route::post("/jenissimpanan", [JenisSimpananController::class, 'store'])->name('postJenisSimpanan');
Route::put("/jenissimpanan/{id}", [JenisSimpananController::class, 'update'])->name('updateJenisSimpanan');
Route::delete("/jenissimpanan/{id}", [JenisSimpananController::class, 'destroy'])->name('deleteJenisSimpanan');
Route::get("/marketing", [MarketingController::class, 'index'])->name('getMarketing');
Route::get("/marketingForSelect", [MarketingController::class, 'list_select'])->name('getListMarketing');
Route::post("/marketing", [MarketingController::class, 'store'])->name('postMarketing');
Route::put("/marketing/{id}", [MarketingController::class, 'update'])->name('updateMarketing');
Route::delete("/marketing/{id}", [MarketingController::class, 'destroy'])->name('deleteMarketing');
Route::get("/akun", [AkunController::class, 'index'])->name('getAkun');
Route::get("/akunForSelect", [AkunController::class, 'list_select'])->name('getListAkunSelect');
Route::post("/akun", [AkunController::class, 'store'])->name('postAkun');
Route::put("/akun/{id}", [AkunController::class, 'update'])->name('updateAkun');
Route::delete("/akun/{id}", [AkunController::class, 'destroy'])->name('deleteAkun');
Route::get("/biayaadmin", [BiayaAdminController::class, 'index'])->name('getBiayaAdmin');
Route::post("/biayaadmin", [BiayaAdminController::class, 'store'])->name('postBiayaAdmin');
Route::put("/biayaadmin/{id}", [BiayaAdminController::class, 'update'])->name('updateBiayaAdmin');
Route::delete("/biayaadmin/{id}", [BiayaAdminController::class, 'destroy'])->name('deleteBiayaAdmin');
Route::get("/pegawai", [PegawaiController::class, 'index'])->name('getPegawai');
Route::get("/pegawaifind/{jabatan}", [PegawaiController::class, 'list_pegawai'])->name('getListPegawai');
Route::post("/pegawai", [PegawaiController::class, 'store'])->name('postPegawai');
Route::put("/pegawai/{id}", [PegawaiController::class, 'update'])->name('updatePegawai');
Route::delete("/pegawai/{id}", [PegawaiController::class, 'destroy'])->name('deletePegawai');
Route::get("/nasabah", [NasabahController::class, 'index'])->name('getNasabah');
Route::get("/nasabahForSelect", [NasabahController::class, 'list_select'])->name('getListNasabah');
Route::post("/nasabah", [NasabahController::class, 'store'])->name('postNasabah');
Route::put("/nasabah/{id}", [NasabahController::class, 'update'])->name('updateNasabah');
Route::delete("/nasabah/{id}", [NasabahController::class, 'destroy'])->name('deleteNasabah');
Route::get("/biayaadmin/{id}", [SettingController::class, 'biaya_admin'])->name('getBiayaAdmin');
Route::put("/nasabah/{id}", [SettingController::class, 'update'])->name('updateBiayaAdmin');

Route::get("/lamaangsuran", [LamaAngsuranController::class, 'index'])->name('getLamaAngsuran');
Route::post("/lamaangsuran", [LamaAngsuranController::class, 'store'])->name('postLamaAngsuran');
Route::put("/lamaangsuran/{id}", [LamaAngsuranController::class, 'update'])->name('updateLamaAngsuran');
Route::delete("/lamaangsuran/{id}", [LamaAngsuranController::class, 'destroy'])->name('deleteLamaAngsuran');
Route::get("/setting", [SettingController::class, 'index'])->name('getSetting');
Route::put("/setting/{id}", [SettingController::class, 'update_setting'])->name('updateSetting');

Route::get("/kas", [KasController::class, 'index'])->name('getKas');
Route::post("/kas", [KasController::class, 'store'])->name('postKas');
Route::put("/kas/{id}", [KasController::class, 'update'])->name('updateKas');
Route::delete("/kas/{id}", [KasController::class, 'destroy'])->name('deleteKas');

Route::get("/simpanan", [SimpananController::class, 'index'])->name('getSimpanan');
Route::post("/simpanan", [SimpananController::class, 'store'])->name('postSimpanan');
Route::put("/simpanan/{id}", [SimpananController::class, 'update'])->name('updateSimpanan');
Route::delete("/simpanan/{id}/{tipe}", [SimpananController::class, 'destroy'])->name('deleteSimpanan');

Route::middleware('auth:sanctum')->group(function () {
  Route::post("/logout", [AuthenticationController::class, 'logout'])->name('logout');

});
