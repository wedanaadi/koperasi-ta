<?php

namespace App\Http\Controllers;

use App\Libraries\Fungsi;
use App\Models\Kas;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class KasController extends Controller
{
  public function index()
  {
    $data = Kas::filter(request(['search']))
      ->with('untukAkun','dariAkun')
      ->where('is_aktif', "1")
      ->where('jenis_transaksi',request(['jenis']))
      ->OrderBy('kode_transaksi', 'ASC')
      ->paginate(request('perpage'));
    return response()->json(['msg' => 'Get data', "data" => $data, 'error' => []], 200);
  }

  public function store(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'tanggal_transaksi' => 'required',
      'keterangan' => 'required',
      'untuk_akun' => 'required',
      'dari_akun' => 'required',
      'jumlah' => 'required',
    ], [
      'required' => 'Input :attribute harus diisi!',
    ]);

    if ($validator->fails()) {
      return response()->json(['msg' => 'Validasi Error', "data" => null, 'errors' => $validator->messages()->toArray()], 422);
    }

    DB::beginTransaction();
    try {
      if($request->jenis === 'pemasukan') {
        $stringKode = "TM";
      } else if($request->jenis === 'pengeluaran') {
        $stringKode = "TK";
      } else {
        $stringKode = "TP";
      }
      $prevID = Kas::where('is_aktif', "0")->where('jenis_transaksi',$request->jenis);
      if ($prevID->count() > 0) {
        $newID = $prevID->first()->kode_transaksi;
      } else {
        $date = date('y') . date('m');
        $lastKode = Kas::select(DB::raw('MAX(kode_transaksi) AS kode'))
          ->where(DB::raw('SUBSTR(kode_transaksi,1,6)'), $stringKode.$date)
          ->first();
        $newID = Fungsi::KodeGenerate($lastKode->kode, 5, 6, $stringKode, $date);
      }
      $payload = [
        'kode_transaksi' => $newID,
        'tanggal_transaksi' => $request->tanggal_transaksi,
        'keterangan' => $request->keterangan,
        'untuk_akun' => $request->untuk_akun,
        'dari_akun' => $request->dari_akun,
        'jenis_transaksi' => $request->jenis,
        'jumlah' => $request->jumlah,
        'created_at' => round(Carbon::now()->timestamp * 1000),
        'updated_at' => round(Carbon::now()->timestamp * 1000),
      ];
      $payloadMaster = [
        [
          'id' => Str::uuid()->toString(),
          'relasi_id' => $newID,
          'akun' => $request->untuk_akun,
          'debet' => $request->jumlah,
          'kredit' => 0,
          'tanggal' => $request->tanggal_transaksi,
        ],
        [
          'id' => Str::uuid()->toString(),
          'relasi_id' => $newID,
          'akun' => $request->dari_akun,
          'kredit' => $request->jumlah,
          'debet' => 0,
          'tanggal' => $request->tanggal_transaksi,
        ]
      ];
      DB::table('master_trx')->insert($payloadMaster);
      Kas::create($payload);
      DB::commit();
      return response()->json(['msg' => 'Successfuly created data', "data" => $payload, 'error' => null], 201);
    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json(['msg' => 'Failed created data', "data" => null, 'error' => $e->getMessage()], 500);
    }
  }

  public function update(Request $request, $id)
  {
    $validator = Validator::make($request->all(), [
      'tanggal_transaksi' => 'required',
      'keterangan' => 'required',
      'untuk_akun' => 'required',
      'dari_akun' => 'required',
      'jumlah' => 'required',
    ], [
      'required' => 'Input :attribute harus diisi!',
    ]);

    if ($validator->fails()) {
      return response()->json(['msg' => 'Validasi Error', "data" => null, 'errors' => $validator->messages()->toArray()], 422);
    }

    $find = Kas::find($id);
    DB::beginTransaction();
    try {
      DB::table('master_trx')->where('relasi_id',$find->kode_transaksi)->delete();
      $payload = [
        'tanggal_transaksi' => $request->tanggal_transaksi,
        'keterangan' => $request->keterangan,
        'untuk_akun' => $request->untuk_akun,
        'dari_akun' => $request->dari_akun,
        'jenis_transaksi' => $request->jenis,
        'jumlah' => $request->jumlah,
        'updated_at' => round(Carbon::now()->timestamp * 1000),
      ];
      $payloadMaster = [
        [
          'id' => Str::uuid()->toString(),
          'relasi_id' => $find->kode_transaksi,
          'akun' => $request->untuk_akun,
          'debet' => $request->jumlah,
          'kredit' => 0,
          'tanggal' => $request->tanggal_transaksi,
        ],
        [
          'id' => Str::uuid()->toString(),
          'relasi_id' => $find->kode_transaksi,
          'akun' => $request->dari_akun,
          'kredit' => $request->jumlah,
          'debet' => 0,
          'tanggal' => $request->tanggal_transaksi,
        ]
      ];
      DB::table('master_trx')->insert($payloadMaster);
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
    $find = Kas::find($id);
    DB::beginTransaction();
    try {
      $payload = [
        'is_aktif' => "0",
        'updated_at' => round(microtime(true) * 1000),
      ];
      $find->update($payload);
      DB::commit();
      return response()->json(['msg' => 'Successfuly delete data', "data" => $payload, 'error' => null], 201);
    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json(['msg' => 'Failed delete data', "data" => null, 'error' => $e->getMessage()], 500);
    }
  }

  public function lap_kas()
  {
    $periode = explode(',',request(['periode'])['periode']);
    $saldoPrev = 0;
    $sebelum = Kas::where('tanggal_transaksi','<',$periode[0])->get();
    foreach ($sebelum as $v) {
      $saldoPrev += $v->jumlah;
    }
    $data = Kas::filter(request(['search','periode']))
      ->with('untukAkun','dariAkun')
      ->where('is_aktif', "1")
      ->where('jenis_transaksi',request(['jenis']))
      ->OrderBy('tanggal_transaksi', 'ASC')
      ->paginate(request('perpage'));
    return response()->json(['msg' => 'Get data', "data" => ['lap' => $data, 'prev' => $saldoPrev], 'error' => []], 200);
  }
}
