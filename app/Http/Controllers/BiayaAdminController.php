<?php

namespace App\Http\Controllers;

use App\Models\BiayaAdmin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class BiayaAdminController extends Controller
{
  public function index()
  {
    $data = BiayaAdmin::filter(request(['search']))
      ->where('is_aktif',"1")
      ->OrderBy('suku_bunga', 'ASC')
      ->paginate(request('perpage'));
    return response()->json(['msg' => 'Get data', "data" => $data, 'error' => []], 200);
  }

  // ! NOTE : Kode untuk menambah data baru
  public function store(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'suku_bunga' => 'required',
      'biaya_administrasi' => 'required',
      'biaya_denda' => 'required',
    ], [
      'required' => 'Input :attribute harus diisi!'
    ]);

    if ($validator->fails()) {
      return response()->json(['msg' => 'Validasi Error', "data" => null, 'errors' => $validator->messages()->toArray()], 422);
    }

    DB::beginTransaction();
    try {
      $payload = [
        'suku_bunga' => $request->suku_bunga,
        'biaya_administrasi' => $request->biaya_administrasi,
        'biaya_denda' => $request->biaya_denda,
        'is_anggota' => $request->biaya_denda,
        'is_aktif' => '1',
        'created_at' => round(microtime(true) * 1000),
        'updated_at' => round(microtime(true) * 1000),
      ];
      BiayaAdmin::create($payload);
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
      'suku_bunga' => 'required',
      'biaya_administrasi' => 'required',
      'biaya_denda' => 'required',
    ], [
      'required' => 'Input :attribute harus diisi!'
    ]);

    if ($validator->fails()) {
      return response()->json(['msg' => 'Validasi Error', "data" => null, 'errors' => $validator->messages()->toArray()], 422);
    }

    $find = BiayaAdmin::find($id);
    DB::beginTransaction();
    try {
      $payload = [
        'suku_bunga' => $request->suku_bunga,
        'biaya_administrasi' => $request->biaya_administrasi,
        'biaya_denda' => $request->biaya_denda,
        'is_anggota' => $request->biaya_denda,
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
    $find = BiayaAdmin::find($id);
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
