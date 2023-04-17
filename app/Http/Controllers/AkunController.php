<?php

namespace App\Http\Controllers;

use App\Models\Akun;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class AkunController extends Controller
{
  public function index()
  {
    $data = Akun::filter(request(['search']))
      ->where('is_aktif',"1")
      ->OrderBy('no_akun', 'ASC')
      ->paginate(request('perpage'));
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
}
