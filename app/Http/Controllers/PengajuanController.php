<?php

namespace App\Http\Controllers;

use App\Libraries\Fungsi;
use App\Models\Pengajuan;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class PengajuanController extends Controller
{
  public function index()
  {
    $data = Pengajuan::filter(request(['search']))
      ->with('marketing', 'jangkaWaktu')
      ->where('is_aktif', "1")
      ->OrderBy('kode_pengajuan', 'ASC')
      ->paginate(request('perpage'));
    return response()->json(['msg' => 'Get data', "data" => $data, 'error' => []], 200);
  }

  public function store(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'tanggal_pengajuan' => 'required',
      'nasabah' => 'required',
      'jumlah_pinjaman' => 'required',
      'jangka_waktu' => 'required',
      'keperluan' => 'required',
      'marketing' => 'required',
    ], [
      'required' => 'Input :attribute harus diisi!',
    ]);

    if ($validator->fails()) {
      return response()->json(['msg' => 'Validasi Error', "data" => null, 'errors' => $validator->messages()->toArray()], 422);
    }

    DB::beginTransaction();
    try {
      $prevID = Pengajuan::where('is_aktif', "0");
      if ($prevID->count() > 0) {
        $newID = $prevID->first()->id_nasabah;
      } else {
        $date = date('y') . date('m');
        $lastKode = Pengajuan::select(DB::raw('MAX(kode_pengajuan) AS kode'))
          ->where(DB::raw('SUBSTR(kode_pengajuan,3,4)'), $date)
          ->first();
        $newID = Fungsi::KodeGenerate($lastKode->kode, 5, 6, 'PP', $date);
      }
      $payload = [
        'kode_pengajuan' => $newID,
        'id_nasabah' => $request->nasabah,
        'jenis_kredit' => "Menetap",
        'nama_lengkap' => $request->nama_lengkap,
        'jumlah_pinjaman' => $request->jumlah_pinjaman,
        'jangka_waktu' => $request->jangka_waktu,
        'keperluan' => $request->keperluan,
        'marketing' => $request->marketing,
        'suku_bunga' => $request->suku_bunga,
        'biaya_admin' => $request->biaya_admin,
        'status' => "0",
        'tanggal_pengajuan' => $request->tanggal_pengajuan,
        'is_aktif' => "1",
        'created_at' => round(Carbon::now()->timestamp * 1000),
        'updated_at' => round(Carbon::now()->timestamp * 1000),
      ];
      Pengajuan::create($payload);
      DB::commit();
      return response()->json(['msg' => 'Successfuly created data Pengajuan', "data" => $payload, 'error' => null], 201);
    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json(['msg' => 'Failed created data Pengajuan', "data" => null, 'error' => $e->getMessage()], 500);
    }
  }

  public function update(Request $request, $id)
  {
    $validator = Validator::make($request->all(), [
      'tanggal_pengajuan' => 'required',
      'nasabah' => 'required',
      'jumlah_pinjaman' => 'required',
      'jangka_waktu' => 'required',
      'keperluan' => 'required',
      'marketing' => 'required',
    ], [
      'required' => 'Input :attribute harus diisi!',
    ]);

    if ($validator->fails()) {
      return response()->json(['msg' => 'Validasi Error', "data" => null, 'errors' => $validator->messages()->toArray()], 422);
    }

    $find = Pengajuan::find($id);
    DB::beginTransaction();
    try {
      $payload = [
        'id_nasabah' => $request->nasabah,
        'jenis_kredit' => "Menetap",
        'nama_lengkap' => $request->nama_lengkap,
        'jumlah_pinjaman' => $request->jumlah_pinjaman,
        'jangka_waktu' => $request->jangka_waktu,
        'keperluan' => $request->keperluan,
        'marketing' => $request->marketing,
        'suku_bunga' => $request->suku_bunga,
        'biaya_admin' => $request->biaya_admin,
        'status' => "0",
        'tanggal_pengajuan' => $request->tanggal_pengajuan,
        'is_aktif' => "1",
        'updated_at' => round(Carbon::now()->timestamp * 1000),
      ];

      $find->update($payload);
      DB::commit();
      return response()->json(['msg' => 'Successfuly update data', "data" => $payload, 'error' => null], 201);
    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json(['msg' => 'Failed update data', "data" => null, 'error' => $e->getMessage()], 500);
    }
  }

  public function update_status(Request $request, $id)
  {
    $find = Pengajuan::find($id);
    DB::beginTransaction();
    try {
      $payload = [

        'status' => $request->status,
        'updated_at' => round(Carbon::now()->timestamp * 1000),
      ];

      $find->update($payload);
      DB::commit();
      return response()->json(['msg' => 'Successfuly update data', "data" => $payload, 'error' => null], 201);
    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json(['msg' => 'Failed update data', "data" => null, 'error' => $e->getMessage()], 500);
    }
  }

  public function destroy($id)
  {
    $find = Pengajuan::find($id);
    DB::beginTransaction();
    try {
      $payload = [
        'is_aktif' => "0",
        'updated_at' => round(microtime(true) * 1000),
      ];
      $find->update($payload);
      DB::commit();
      return response()->json(['msg' => 'Successfuly delete', "data" => $payload, 'error' => null], 201);
    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json(['msg' => 'Failed delete', "data" => null, 'error' => $e->getMessage()], 500);
    }
  }
}
