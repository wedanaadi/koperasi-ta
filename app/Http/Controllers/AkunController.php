<?php

namespace App\Http\Controllers;

use App\Models\Akun;
use App\Models\MasterAkun;
use App\Models\SimpananDetail;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use PDF;

class AkunController extends Controller
{
  public function index()
  {
    $data = Akun::filter(request(['search']))
      ->where('is_aktif', "1")
      ->OrderBy('no_akun', 'ASC')
      ->paginate(request('perpage'));
    return response()->json(['msg' => 'Get data', "data" => $data, 'error' => []], 200);
  }

  public function list_select()
  {
    $dataDB = Akun::where('is_aktif', "1")
      ->OrderBy('no_akun', 'ASC')
      ->get();
    $data = [];
    foreach ($dataDB as $v) {
      array_push($data, [
        'label' => $v->jenis_transaksi,
        'value' => $v->id
      ]);
    }
    return response()->json(['msg' => 'Get data', "data" => $data, 'error' => []], 200);
  }

  // ! NOTE : Kode untuk menambah data baru
  public function store(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'no_akun' => 'required',
      'jenis_transaksi' => 'required',
      'akun' => 'required',
    ], [
      'required' => 'Input :attribute harus diisi!'
    ]);

    if ($validator->fails()) {
      return response()->json(['msg' => 'Validasi Error', "data" => null, 'errors' => $validator->messages()->toArray()], 422);
    }

    DB::beginTransaction();
    try {
      $payload = [
        'no_akun' => $request->no_akun,
        'jenis_transaksi' => $request->jenis_transaksi,
        'akun' => $request->akun,
        'is_aktif' => '1',
        'created_at' => round(microtime(true) * 1000),
        'updated_at' => round(microtime(true) * 1000),
      ];
      Akun::create($payload);
      DB::commit();
      return response()->json(['msg' => 'Successfuly created data lama angsuran', "data" => $payload, 'error' => null], 201);
    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json(['msg' => 'Failed created data lama angsuran', "data" => null, 'error' => $e->getMessage()], 500);
    }
  }

  // ! NOTE : Kode untuk mengubah data baru
  public function update(Request $request, $id)
  {
    $validator = Validator::make($request->all(), [
      'no_akun' => 'required',
      'jenis_transaksi' => 'required',
      'akun' => 'required',
    ], [
      'required' => 'Input :attribute harus diisi!'
    ]);

    if ($validator->fails()) {
      return response()->json(['msg' => 'Validasi Error', "data" => null, 'errors' => $validator->messages()->toArray()], 422);
    }

    $find = Akun::find($id);
    DB::beginTransaction();
    try {
      $payload = [
        'no_akun' => $request->no_akun,
        'jenis_transaksi' => $request->jenis_transaksi,
        'akun' => $request->akun,
        'is_aktif' => '1',
        'updated_at' => round(microtime(true) * 1000),
      ];
      $find->update($payload);
      DB::commit();
      return response()->json(['msg' => 'Successfuly update data lama angsuran', "data" => $payload, 'error' => null], 201);
    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json(['msg' => 'Failed update data lama angsuran', "data" => null, 'error' => $e->getMessage()], 500);
    }
  }

  // ! NOTE : Kode untuk menghapus data
  public function destroy($id)
  {
    $find = Akun::find($id);
    DB::beginTransaction();
    try {
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

  public function lap_akun()
  {
    $data = [];
    $akun = Akun::filter(request(['periode']))
      ->where('is_aktif', "1")
      ->OrderBy('no_akun', 'ASC')->get();
    foreach ($akun as $v) {
      $master = MasterAkun::filter(request(['periode']))->where('akun',$v->id);
      $arr = [
        'no_akun' => $v->no_akun,
        'jenis' => $v->jenis_transaksi,
        'debet' => 0,
        'kredit' => 0,
      ];
      if($master->count() > 0) {
        $debet = 0;
        $kredit = 0;
        foreach ($master->get() as $m) {
          $debet += $m->debet;
          $kredit += $m->kredit;
        }
        $arr['debet'] = $debet;
        $arr['kredit'] = $kredit;
      }
      array_push($data,$arr);
    }
    return response()->json(['msg' => 'Get data', "data" => $data, 'error' => []], 200);
  }

  public function cetak_header($alamat)
  {
    return view('pdf.headerReport', compact('alamat'));
  }

  public function cetak_neraca()
  {
    $data = [];
    $akun = Akun::filter(request(['periode']))
      ->where('is_aktif', "1")
      ->OrderBy('no_akun', 'ASC')->get();
    foreach ($akun as $v) {
      $master = MasterAkun::filter(request(['periode']))->where('akun',$v->id);
      $arr = [
        'no_akun' => $v->no_akun,
        'jenis' => $v->jenis_transaksi,
        'debet' => 0,
        'kredit' => 0,
      ];
      if($master->count() > 0) {
        $debet = 0;
        $kredit = 0;
        foreach ($master->get() as $m) {
          $debet += $m->debet;
          $kredit += $m->kredit;
        }
        $arr['debet'] = $debet;
        $arr['kredit'] = $kredit;
      }
      array_push($data,$arr);
    }
    $p = explode(',', request(['periode'])['periode']);
      $body = [
        'data' => $data,
        'periode' => [
          'start' => Carbon::createFromTimestamp($p[0] / 1000)->format('d/m/Y'),
          'end' => Carbon::createFromTimestamp($p[1] / 1000)->format('d/m/Y'),
        ],
      ];
      $setting = [
        'lokasi' => request(['lokasi'])['lokasi'],
        'judul' => "Laporan Kas Simpanan",
      ];
      $header = $this->cetak_header(base64_decode(request(['alamat'])['alamat']) . ', ' . request(['lokasi'])['lokasi']);
      $html = view('pdf.neraca', compact('header', 'body', 'setting'));
      return PDF::loadHTML($html)->setPaper('A4')
        ->setOrientation('portrait')
        ->inline($setting['judul'] . '-' . date('Y-m-d') . '.pdf');
  }
}
