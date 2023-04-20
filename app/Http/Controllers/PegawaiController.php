<?php

namespace App\Http\Controllers;

use App\Models\Pegawai;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class PegawaiController extends Controller
{
  public function index()
  {
    $data = Pegawai::filter(request(['search']))
      ->where('is_aktif',"1")
      ->OrderBy('nama_lengkap', 'ASC')
      ->paginate(request('perpage'));
    return response()->json(['msg' => 'Get data', "data" => $data, 'error' => []], 200);
  }

  public function list_pegawai($jabatan)
  {
    $dataDB = Pegawai::where('jabatan',$jabatan)
      ->where('is_aktif',"1")
      ->OrderBy('nama_lengkap', 'ASC')
      ->get();
    $data = [];
    foreach ($dataDB as $v) {
      array_push($data,[
        'label' => $v->nama_lengkap,
        'value' => $v->id
      ]);
    }
    return response()->json(['msg' => 'Get data', "data" => $data, 'error' => []], 200);
  }

  public function store(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'nama_lengkap' => 'required',
      'alamat' => 'required',
      'no_handphone' => 'required',
      'username' => 'required|unique:pegawais',
      'password' => 'required',
      'jabatan' => 'required',
    ], [
      'required' => 'Input :attribute harus diisi!',
      'jabatan.required' => 'Input Level harus diisi!',
      'unique' => 'Input :attribute sudah digunakan!',
    ]);

    if ($validator->fails()) {
      return response()->json(['msg' => 'Validasi Error', "data" => null, 'errors' => $validator->messages()->toArray()], 422);
    }

    DB::beginTransaction();
    try {
      $payload = [
        'nama_lengkap' => $request->nama_lengkap,
        'alamat' => $request->alamat,
        'no_handphone' => $request->no_handphone,
        'username' => $request->username,
        'password' => bcrypt($request->password),
        'jabatan' => $request->jabatan,
        'created_at' => round(Carbon::now()->timestamp * 1000),
        'updated_at' => round(Carbon::now()->timestamp * 1000),
      ];
      Pegawai::create($payload);
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
      'nama_lengkap' => 'required',
      'alamat' => 'required',
      'no_handphone' => 'required',
      'username' => 'required|unique:pegawais,username,'.$id,
      // 'password' => 'required',
      'jabatan' => 'required',
    ], [
      'required' => 'Input :attribute harus diisi!',
      'jabatan.required' => 'Input Level harus diisi!',
      'unique' => 'Input :attribute sudah digunakan!',
    ]);

    if ($validator->fails()) {
      return response()->json(['msg' => 'Validasi Error', "data" => null, 'errors' => $validator->messages()->toArray()], 422);
    }

    $find = Pegawai::find($id);
    DB::beginTransaction();
    try {
      $payload = [
        'nama_lengkap' => $request->nama_lengkap,
        'alamat' => $request->alamat,
        'no_handphone' => $request->no_handphone,
        'username' => $request->username,
        'jabatan' => $request->jabatan,
        'updated_at' => round(microtime(true) * 1000),
      ];
      if ($request->password != '' or $request->password != null) {
        $payload['password'] = Hash::make($request->password);
      }
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
    $find = Pegawai::find($id);
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
