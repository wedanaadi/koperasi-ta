<?php

namespace App\Http\Controllers;

use App\Models\JenisSimpanan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class JenisSimpananController extends Controller
{
  public function index()
  {
    $data = JenisSimpanan::filter(request(['search']))
      ->where('is_aktif',"1")
      ->OrderBy('nama_jenis_simpanan', 'ASC')
      ->paginate(request('perpage'));
    return response()->json(['msg' => 'Get data', "data" => $data, 'error' => []], 200);
  }

  // ! NOTE : Kode untuk menambah data baru
  public function store(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'nama_jenis_simpanan' => 'required',
      'saldo_minimal' => 'required|int',
    ], [
      'required' => 'Input :attribute harus diisi!',
      'int' => 'Input :attribute harus bilangan!'
    ]);

    if ($validator->fails()) {
      return response()->json(['msg' => 'Validasi Error', "data" => null, 'errors' => $validator->messages()->toArray()], 422);
    }

    DB::beginTransaction();
    try {
      $payload = [
        'nama_jenis_simpanan' => $request->nama_jenis_simpanan,
        'saldo_minimal' => $request->saldo_minimal,
        'is_aktif' => '1',
        'created_at' => round(microtime(true) * 1000),
        'updated_at' => round(microtime(true) * 1000),
      ];
      JenisSimpanan::create($payload);
      DB::commit();
      return response()->json(['msg' => 'Successfuly created data jenis simpanan', "data" => $payload, 'error' => null], 201);
    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json(['msg' => 'Failed created data jenis simpanan', "data" => null, 'error' => $e->getMessage()], 500);
    }
  }

  // ! NOTE : Kode untuk mengubah data baru
  public function update(Request $request, $id)
  {
    $validator = Validator::make($request->all(), [
      'nama_jenis_simpanan' => 'required',
      'saldo_minimal' => 'required|int',
    ], [
      'required' => 'Input :attribute harus diisi!',
      'int' => 'Input :attribute harus bilangan!'
    ]);

    $find = JenisSimpanan::find($id);
    DB::beginTransaction();
    try {
      $payload = [
        'nama_jenis_simpanan' => $request->nama_jenis_simpanan,
        'saldo_minimal' => $request->saldo_minimal,
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
    $find = JenisSimpanan::find($id);
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
