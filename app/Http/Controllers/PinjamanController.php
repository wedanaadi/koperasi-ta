<?php

namespace App\Http\Controllers;

use App\Libraries\Fungsi;
use App\Models\LamaAngsuran;
use App\Models\Pinjaman;
use App\Models\SimulasiAngsuran;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class PinjamanController extends Controller
{
  public function index()
  {
    $data = Pinjaman::filter(request(['search']))
      ->with('jangkaWaktu')
      ->where('is_aktif', "1")
      ->OrderBy('no_pinjaman', 'ASC')
      ->paginate(request('perpage'));
    return response()->json(['msg' => 'Get data', "data" => $data, 'error' => []], 200);
  }

  // public function paginateCustom($items, $perPage = 5, $page = null, $options = [])
  // {
  //   $page = $page ?: (Paginator::resolveCurrentPage() ?: 1);
  //   $items = $items instanceof Collection ? $items : Collection::make($items);
  //   return new LengthAwarePaginator($items->forPage($page, $perPage), $items->count(), $perPage, $page, $options);
  // }

  public function store(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'tanggal_pinjaman' => 'required',
      'nasabah' => 'required',
      'jumlah_pinjaman' => 'required',
      'jangka_waktu' => 'required',
      'ambil_akun' => 'required',
      'simpan_akun' => 'required',
    ], [
      'required' => 'Input :attribute harus diisi!',
      'ambil_akun.required' => 'Input ambil dari akun harus diisi!',
      'simpan_akun.required' => 'Input simpan dari akun harus diisi!',
    ]);

    if ($validator->fails()) {
      return response()->json(['msg' => 'Validasi Error', "data" => null, 'errors' => $validator->messages()->toArray()], 422);
    }

    DB::beginTransaction();
    try {
      $prevID = Pinjaman::where('is_aktif', "0");
      if ($prevID->count() > 0) {
        $newID = $prevID->first()->id_nasabah;
      } else {
        $date = date('y') . date('m');
        $lastKode = Pinjaman::select(DB::raw('MAX(no_pinjaman) AS kode'))
          ->where(DB::raw('SUBSTR(no_pinjaman,3,4)'), $date)
          ->first();
        $newID = Fungsi::KodeGenerate($lastKode->kode, 5, 6, 'PJ', $date);
      }

      $payloadPinjaman = [
        'no_pinjaman' => $newID,
        'id_nasabah' => $request->nasabah,
        'nama_nasabah' => $request->nama_lengkap,
        'jumlah_pinjaman' => $request->jumlah_pinjaman,
        'jangka_waktu' => $request->jangka_waktu,
        'suku_bunga' => $request->suku_bunga,
        'biaya_admin' => $request->biaya_admin,
        'ambil_akun' => $request->ambil_akun,
        'simpan_akun' => $request->simpan_akun,
        'tanggal_pinjaman' => $request->tanggal_pinjaman,
        'created_at' => round(Carbon::now()->timestamp * 1000),
        'updated_at' => round(Carbon::now()->timestamp * 1000),
      ];

      $besarPinjaman = (int)$request->jumlah_pinjaman;
      $sukuBunga = ((int)$request->suku_bunga / 100) / 12;
      $jangkaWaktu = (int)LamaAngsuran::find($request->jangka_waktu)->lama_angsuran;
      // Carbon::createFromTimestamp($request->tanggal_pinjaman/1000)->addMonths(1)->timestamp : ini epoch time
      // Carbon::createFromTimestamp($request->tanggal_pinjaman / 1000)->addMonths($i)->toDateString() : date time string
      $simulasi = [];
      for ($i = 1; $i <= $jangkaWaktu; $i++) {
        array_push($simulasi, [
          'id' => Str::uuid()->toString(),
          'bulan' => $i,
          'pinjaman_id' => $newID,
          'jatuh_tempo' => Carbon::createFromTimestamp($request->tanggal_pinjaman / 1000)->addMonths($i)->timestamp,
          'pokok' => round($besarPinjaman / $jangkaWaktu, 2),
          'bunga' => round($besarPinjaman * $sukuBunga, 2),
          'total' => round($besarPinjaman / $jangkaWaktu) + round($besarPinjaman * $sukuBunga),
          'created_at' => round(Carbon::now()->timestamp * 1000),
          'updated_at' => round(Carbon::now()->timestamp * 1000),
        ]);
      }
      Pinjaman::create($payloadPinjaman);
      SimulasiAngsuran::insert($simulasi);
      DB::commit();
      return response()->json(['msg' => 'Successfuly created data', "data" => $payloadPinjaman, 'error' => null], 201);
    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json(['msg' => 'Failed created data', "data" => null, 'error' => $e->getMessage()], 500);
    }
  }

  public function update(Request $request, $id)
  {
    $validator = Validator::make($request->all(), [
      'tanggal_pinjaman' => 'required',
      'nasabah' => 'required',
      'jumlah_pinjaman' => 'required',
      'jangka_waktu' => 'required',
      'ambil_akun' => 'required',
      'simpan_akun' => 'required',
    ], [
      'required' => 'Input :attribute harus diisi!',
      'ambil_akun.required' => 'Input ambil dari akun harus diisi!',
      'simpan_akun.required' => 'Input simpan dari akun harus diisi!',
    ]);

    if ($validator->fails()) {
      return response()->json(['msg' => 'Validasi Error', "data" => null, 'errors' => $validator->messages()->toArray()], 422);
    }

    $find = Pinjaman::find($id);
    DB::beginTransaction();
    try {
      SimulasiAngsuran::where('pinjaman_id', $find->no_pinjaman)->delete();
      $payloadPinjaman = [
        'id_nasabah' => $request->nasabah,
        'nama_nasabah' => $request->nama_lengkap,
        'jumlah_pinjaman' => $request->jumlah_pinjaman,
        'jangka_waktu' => $request->jangka_waktu,
        'suku_bunga' => $request->suku_bunga,
        'biaya_admin' => $request->biaya_admin,
        'ambil_akun' => $request->ambil_akun,
        'simpan_akun' => $request->simpan_akun,
        'tanggal_pinjaman' => $request->tanggal_pinjaman,
        'updated_at' => round(Carbon::now()->timestamp * 1000),
      ];

      $besarPinjaman = (int)$request->jumlah_pinjaman;
      $sukuBunga = ((int)$request->suku_bunga / 100) / 12;
      $jangkaWaktu = (int)LamaAngsuran::find($request->jangka_waktu)->lama_angsuran;
      // Carbon::createFromTimestamp($request->tanggal_pinjaman/1000)->addMonths(1)->timestamp : ini epoch time
      // Carbon::createFromTimestamp($request->tanggal_pinjaman / 1000)->addMonths($i)->toDateString() : date time string
      $simulasi = [];
      for ($i = 1; $i <= $jangkaWaktu; $i++) {
        array_push($simulasi, [
          'id' => Str::uuid()->toString(),
          'bulan' => $i,
          'pinjaman_id' => $find->no_pinjaman,
          'jatuh_tempo' => Carbon::createFromTimestamp($request->tanggal_pinjaman / 1000)->addMonths($i)->timestamp,
          'pokok' => round($besarPinjaman / $jangkaWaktu, 2),
          'bunga' => round($besarPinjaman * $sukuBunga, 2),
          'total' => round($besarPinjaman / $jangkaWaktu) + round($besarPinjaman * $sukuBunga),
          'created_at' => round(Carbon::now()->timestamp * 1000),
          'updated_at' => round(Carbon::now()->timestamp * 1000),
        ]);
      }
      $find->update($payloadPinjaman);
      SimulasiAngsuran::insert($simulasi);
      DB::commit();
      return response()->json(['msg' => 'Successfuly update data', "data" => $payloadPinjaman, 'error' => null], 201);
    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json(['msg' => 'Failed update data', "data" => null, 'error' => $e->getMessage()], 500);
    }
  }

  public function destroy($id)
  {
    $find = Pinjaman::find($id);
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
