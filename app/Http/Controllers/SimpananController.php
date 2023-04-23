<?php

namespace App\Http\Controllers;

use App\Libraries\Fungsi;
use App\Models\JenisSimpanan;
use App\Models\Simpanan;
use App\Models\SimpananDetail;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class SimpananController extends Controller
{
  public function index()
  {
    $data = SimpananDetail::filter(request(['search']))
      ->with('simpanan', 'marketing', 'simpanan.nasabah', 'simpanan.jenis_simpanan', 'untuk_akun')
      ->where('is_aktif', "1")
      ->where('type', request(['tipe']))
      ->OrderBy('id', 'ASC')
      ->paginate(request('perpage'));
    return response()->json(['msg' => 'Get data', "data" => $data, 'error' => []], 200);
  }

  public function store(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'tanggal_transaksi' => 'required',
      'nasabah' => 'required',
      'jenis_simpanan' => 'required',
      'jumlah_setoran' => 'required',
      'keterangan' => 'required',
      'untuk_akun' => 'required',
      'marketing' => 'required',
    ], [
      'required' => 'Input :attribute harus diisi!',
    ]);

    if ($validator->fails()) {
      return response()->json(['msg' => 'Validasi Error', "data" => null, 'errors' => $validator->messages()->toArray()], 422);
    }

    DB::beginTransaction();
    try {
      $jenisSimpanan = JenisSimpanan::find($request->jenis_simpanan);
      if ((int)$request->jumlah_setoran < (int)$jenisSimpanan->saldo_minimal) {
        return response()->json(['errors' => 'Saldo setoran minimal harus ' . number_format($jenisSimpanan->saldo_minimal, 0, ",", ".") . '!'], 403);
      }
      if($request->tipe === 'setoran') {
        $stringKode = "SS";
        $jenis = "1";
      } else {
        $stringKode = "PS";
        $jenis = "2";
      }
      $prevID = SimpananDetail::where('is_aktif', "0")->where('type',$jenis);
      if ($prevID->count() > 0) {
        $newID = $prevID->first()->id;
      } else {
        $date = date('y') . date('m');
        $lastKode = SimpananDetail::select(DB::raw('MAX(id) AS kode'))
          ->where(DB::raw('SUBSTR(id,1,6)'), $stringKode.$date)
          ->first();
        $newID = Fungsi::KodeGenerate($lastKode->kode, 5, 6, $stringKode, $date);
      }

      $dataSimpanan = Simpanan::where('id_nasabah', $request->nasabah)->where('jenis_simpanan', $request->jenis_simpanan);
      $saldoSimpanan = 0;
      $simpananNewID = Str::uuid()->toString();
      if ($dataSimpanan->count() > 0) {
        $simpananNewID = $dataSimpanan->first()->id;
        if ($request->tipe === 'setoran') {
          $saldoSimpanan = $dataSimpanan->first()->jumlah_tabungan + $request->jumlah_setoran;
        } else {
          $saldoSimpanan = $dataSimpanan->first()->jumlah_tabungan - $request->jumlah_setoran;
        }
        if($saldoSimpanan < 0) {
          return response()->json(['errors' => 'Jumlah tabungan tidak mencukupi!, saldo simpanan '.number_format($dataSimpanan->first()->jumlah_tabungan, 0, ",", ".")], 403);
        }
        $payloadSimpanan = [
          'jumlah_tabungan' => $saldoSimpanan,
          'updated_at' => round(Carbon::now()->timestamp * 1000),
        ];
        $dataSimpanan->update($payloadSimpanan);
      } else {
        if ($request->tipe === 'setoran') {
          $saldoSimpanan += $request->jumlah_setoran;
          $payloadSimpanan = [
            'id' => $simpananNewID,
            'id_nasabah' => $request->nasabah,
            'jenis_simpanan' => $request->jenis_simpanan,
            'jumlah_tabungan' => $saldoSimpanan,
            'tanggal_buka' => round(Carbon::now()->timestamp * 1000),
            'created_at' => round(Carbon::now()->timestamp * 1000),
            'updated_at' => round(Carbon::now()->timestamp * 1000),
          ];
          Simpanan::create($payloadSimpanan);
        } else {
          return response()->json(['errors' => 'Nasabah tidak memiliki simpanan dari jenis simpanan yang dipilih!'], 403);
        }
      }
      $payload = [
        'id' => $newID,
        'simpanan_id' => $simpananNewID,
        'type' => $request->tipe === 'setoran' ? 1 : 0,
        'saldo' => $request->jumlah_setoran,
        'saldo_akhir' => $saldoSimpanan,
        'tanggal_transaksi' => $request->tanggal_transaksi,
        'marketing' => $request->marketing,
        'keterangan' => $request->keterangan,
        'untuk_akun' => $request->untuk_akun,
        'created_at' => round(Carbon::now()->timestamp * 1000),
        'updated_at' => round(Carbon::now()->timestamp * 1000),
      ];
      SimpananDetail::create($payload);
      DB::commit();
      return response()->json(['msg' => 'Successfuly created data Nasabah', "data" => $payload, 'error' => null], 201);
    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json(['msg' => 'Failed created data Nasabah', "data" => null, 'error' => $e->getMessage()], 500);
    }
  }

  public function update(Request $request, $id)
  {
    $validator = Validator::make($request->all(), [
      'tanggal_transaksi' => 'required',
      'nasabah' => 'required',
      'jenis_simpanan' => 'required',
      'jumlah_setoran' => 'required',
      'keterangan' => 'required',
      'untuk_akun' => 'required',
      'marketing' => 'required',
    ], [
      'required' => 'Input :attribute harus diisi!',
    ]);

    if ($validator->fails()) {
      return response()->json(['msg' => 'Validasi Error', "data" => null, 'errors' => $validator->messages()->toArray()], 422);
    }

    $find = SimpananDetail::find($id);


    DB::beginTransaction();
    try {
      $jenisSimpanan = JenisSimpanan::find($request->jenis_simpanan);
      if ((int)$request->jumlah_setoran < (int)$jenisSimpanan->saldo_minimal) {
        return response()->json(['errors' => 'Saldo setoran minimal harus ' . number_format($jenisSimpanan->saldo_minimal, 0, ",", ".") . '!'], 403);
      }

      $oldSimpanan = Simpanan::find($find->simpanan_id);
      if($oldSimpanan->jenis_simpanan === $request->jenis_simpanan) {
        if($request->tipe === 'setoran') {
          $oldSimpanan->update([
            'jumlah_tabungan' => $oldSimpanan->jumlah_tabungan - $find->saldo,
          ]);
        } else {
          $oldSimpanan->update([
            'jumlah_tabungan' => $oldSimpanan->jumlah_tabungan + $find->saldo,
          ]);
        }
      } else {
        $oldSimpanan->delete();
      }

      $dataSimpanan = Simpanan::where('id_nasabah', $request->nasabah)->where('jenis_simpanan', $request->jenis_simpanan);
      $saldoSimpanan = 0;
      $simpananNewID = Str::uuid()->toString();
      if ($dataSimpanan->count() > 0) {
        $simpananNewID = $dataSimpanan->first()->id;
        if ($request->tipe === 'setoran') {
          $saldoSimpanan = $dataSimpanan->first()->jumlah_tabungan + $request->jumlah_setoran;
        } else {
          $saldoSimpanan = $dataSimpanan->first()->jumlah_tabungan - $request->jumlah_setoran;
        }
        if($saldoSimpanan < 0) {
          return response()->json(['errors' => 'Jumlah tabungan tidak mencukupi!, saldo simpanan '.number_format($dataSimpanan->first()->jumlah_tabungan, 0, ",", ".")], 403);
        }
        $payloadSimpanan = [
          'jumlah_tabungan' => $saldoSimpanan,
          'updated_at' => round(Carbon::now()->timestamp * 1000),
        ];
        $dataSimpanan->update($payloadSimpanan);
      } else {
        if ($request->tipe === 'setoran') {
          $saldoSimpanan += $request->jumlah_setoran;
          $payloadSimpanan = [
            'id' => $simpananNewID,
            'id_nasabah' => $request->nasabah,
            'jenis_simpanan' => $request->jenis_simpanan,
            'jumlah_tabungan' => $saldoSimpanan,
            'tanggal_buka' => round(Carbon::now()->timestamp * 1000),
            'created_at' => round(Carbon::now()->timestamp * 1000),
            'updated_at' => round(Carbon::now()->timestamp * 1000),
          ];
          Simpanan::create($payloadSimpanan);
        } else {
          return response()->json(['errors' => 'Nasabah tidak memiliki simpanan dari jenis simpanan yang dipilih!'], 403);
        }
      }
      $payload = [
        'simpanan_id' => $simpananNewID,
        'type' => $request->tipe === 'setoran' ? 1 : 0,
        'saldo' => $request->jumlah_setoran,
        'saldo_akhir' => $saldoSimpanan,
        'tanggal_transaksi' => $request->tanggal_transaksi,
        'marketing' => $request->marketing,
        'keterangan' => $request->keterangan,
        'untuk_akun' => $request->untuk_akun,
        'updated_at' => round(Carbon::now()->timestamp * 1000),
      ];
      $find->update($payload);
      //   SimpananDetail::create($payload);
      DB::commit();
      return response()->json(['msg' => 'Successfuly created data Nasabah', "data" => $payload, 'error' => null], 201);
    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json(['msg' => 'Failed created data Nasabah', "data" => null, 'error' => $e->getMessage()], 500);
    }
  }

  public function destroy($id, $tipe)
  {
    $find = SimpananDetail::find($id);
    DB::beginTransaction();
    try {
      $simpanan = Simpanan::find($find->simpanan_id);
      if ($tipe === 'setoran') {
        $simpanan->update([
          'jumlah_tabungan' => $simpanan->jumlah_tabungan - $find->saldo,
        ]);
      } else {
        $simpanan->update([
          'jumlah_tabungan' => $simpanan->jumlah_tabungan + $find->saldo,
        ]);
      }
      $payload = [
        'is_aktif' => "0",
        'updated_at' => round(microtime(true) * 1000),
      ];
      $find->update($payload);
      DB::commit();
      return response()->json(['msg' => 'Successfuly update data delete', "data" => $payload, 'error' => null], 201);
    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json(['msg' => 'Failed update data delete', "data" => null, 'error' => $e->getMessage()], 500);
    }
  }
}
