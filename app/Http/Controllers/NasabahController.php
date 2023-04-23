<?php

namespace App\Http\Controllers;

use App\Libraries\Fungsi;
use App\Models\BiayaAdmin;
use App\Models\Nasabah;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class NasabahController extends Controller
{
  public function index()
  {
    $data = Nasabah::filter(request(['search']))
      ->where('is_aktif',"1")
      ->OrderBy('id_nasabah', 'ASC')
      ->paginate(request('perpage'));
    return response()->json(['msg' => 'Get data', "data" => $data, 'error' => []], 200);
  }

  public function list_select()
  {
    $dataDB = Nasabah::where('is_aktif', "1")
      ->OrderBy('nama_lengkap', 'ASC')
      ->get();
    $data = [];
    foreach ($dataDB as $v) {
      array_push($data, [
        'label' => $v->nama_lengkap,
        'value' => $v->id_nasabah
      ]);
    }
    return response()->json(['msg' => 'Get data', "data" => $data, 'error' => []], 200);
  }

  public function find_nasabah($id)
  {
    $nasabah = Nasabah::where('id_nasabah',$id)->first();
    if($nasabah->jabatan === 'bukan') {
      $isAnggota = "0";
    } else {
      $isAnggota = "1";
    }
    $biayaAdmin = BiayaAdmin::where('is_anggota',$isAnggota)->first();
    $data = [
      'nasabah' => $nasabah,
      'biaya' => $biayaAdmin
    ];
    return response()->json(['msg' => 'Get data', "data" => $data, 'error' => []], 200);
  }

  public function store(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'no_ktp' => 'required',
      'nama_lengkap' => 'required',
      'inisial' => 'required',
      'jenis_kelamin' => 'required',
      'agama' => 'required',
      'alamat' => 'required',
      'status' => 'required',
      'pekerjaan' => 'required',
      'nama_ibu_kandung' => 'required',
      'tanggal_daftar' => 'required',
      'jabatan' => 'required',
    ], [
      'required' => 'Input :attribute harus diisi!',
    ]);

    if ($validator->fails()) {
      return response()->json(['msg' => 'Validasi Error', "data" => null, 'errors' => $validator->messages()->toArray()], 422);
    }

    DB::beginTransaction();
    try {
      $prevID = Nasabah::where('is_aktif', "0");
      if ($prevID->count() > 0) {
        $newID = $prevID->first()->id_nasabah;
      } else {
        $date = date('y') . date('m');
        $lastKode = Nasabah::select(DB::raw('MAX(id_nasabah) AS kode'))
          ->where(DB::raw('SUBSTR(id_nasabah,3,4)'), $date)
          ->first();
        $newID = Fungsi::KodeGenerate($lastKode->kode, 5, 6, 'NS', $date);
      }
      $payload = [
        'id_nasabah' => $newID,
        'no_ktp' => $request->no_ktp,
        'nama_lengkap' => $request->nama_lengkap,
        'inisial' => $request->inisial,
        'jenis_kelamin' => $request->jenis_kelamin,
        'agama' => $request->agama,
        'alamat' => $request->alamat,
        'status' => $request->status,
        'pekerjaan' => $request->pekerjaan,
        'nama_ibu_kandung' => $request->nama_ibu_kandung,
        'tanggal_daftar' => $request->tanggal_daftar,
        'jabatan' => $request->jabatan,
        'created_at' => round(Carbon::now()->timestamp * 1000),
        'updated_at' => round(Carbon::now()->timestamp * 1000),
      ];
      Nasabah::create($payload);
      DB::commit();
      return response()->json(['msg' => 'Successfuly created data Nasabah', "data" => $payload, 'error' => null], 201);
    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json(['msg' => 'Failed created data Nasabah', "data" => null, 'error' => $e->getMessage()], 500);
    }
  }

  // ! NOTE : Kode untuk mengubah data baru
  public function update(Request $request, $id)
  {
    $validator = Validator::make($request->all(), [
      'no_ktp' => 'required',
      'nama_lengkap' => 'required',
      'inisial' => 'required',
      'jenis_kelamin' => 'required',
      'agama' => 'required',
      'alamat' => 'required',
      'status' => 'required',
      'pekerjaan' => 'required',
      'nama_ibu_kandung' => 'required',
      'tanggal_daftar' => 'required',
      'jabatan' => 'required',
    ], [
      'required' => 'Input :attribute harus diisi!',
    ]);

    if ($validator->fails()) {
      return response()->json(['msg' => 'Validasi Error', "data" => null, 'errors' => $validator->messages()->toArray()], 422);
    }

    $find = Nasabah::find($id);
    DB::beginTransaction();
    try {
      $payload = [
        'no_ktp' => $request->no_ktp,
        'nama_lengkap' => $request->nama_lengkap,
        'inisial' => $request->inisial,
        'jenis_kelamin' => $request->jenis_kelamin,
        'agama' => $request->agama,
        'alamat' => $request->alamat,
        'status' => $request->status,
        'pekerjaan' => $request->pekerjaan,
        'nama_ibu_kandung' => $request->nama_ibu_kandung,
        'tanggal_daftar' => $request->tanggal_daftar,
        'jabatan' => $request->jabatan,
        'updated_at' => round(Carbon::now()->timestamp * 1000),
      ];

      $find->update($payload);
      DB::commit();
      return response()->json(['msg' => 'Successfuly update data Nasabah', "data" => $payload, 'error' => null], 201);
    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json(['msg' => 'Failed update data Nasabah', "data" => null, 'error' => $e->getMessage()], 500);
    }
  }

  // ! NOTE : Kode untuk menghapus data
  public function destroy($id)
  {
    $find = Nasabah::find($id);
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
}
