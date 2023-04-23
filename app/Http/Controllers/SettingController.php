<?php

namespace App\Http\Controllers;

use App\Models\BiayaAdmin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class SettingController extends Controller
{
  public function index()
  {
    $data = DB::table('setting_sistem')->first();
    return response()->json(['msg' => 'Get setting', "data" => $data, 'error' => []], 200);
  }

  function biaya_admin($id)
  {
    $data = BiayaAdmin::find($id);
    return response()->json(['msg' => 'Get Biaya Admin', "data" => $data, 'error' => []], 200);
  }

  public function update(Request $request, $id)
  {
    $validator = Validator::make($request->all(), [
      'suku_bunga' => 'required',
      'biaya_administrasi' => 'required',
      'biaya_denda' => 'required',
    ], [
      'required' => 'Input :attribute harus diisi!',
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
        'is_anggota' => $request->is_anggota,
        'created_at' => round(microtime(true) * 1000),
        'updated_at' => round(microtime(true) * 1000),
      ];
      $find->update($payload);
      DB::commit();
      return response()->json(['msg' => 'Successfuly update setting biaya administrasi', "data" => $payload, 'error' => null], 201);
    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json(['msg' => 'Failed update setting biaya administrasi', "data" => null, 'error' => $e->getMessage()], 500);
    }
  }

  public function update_setting(Request $request, $id)
  {
    $validator = Validator::make($request->all(), [
      'lokasi' => 'required',
      'alamat' => 'required',
      'direktur' => 'required',
      'admin' => 'required',
      'teller' => 'required',
    ], [
      'required' => 'Input :attribute harus diisi!',
      'admin.required' => 'Input admin kredit harus diisi!',
    ]);

    if ($validator->fails()) {
      return response()->json(['msg' => 'Validasi Error', "data" => null, 'errors' => $validator->messages()->toArray()], 422);
    }

    $find = DB::table('setting_sistem')->where('id',$id);
    DB::beginTransaction();
    try {
      $payload = [
        'lokasi' => $request->lokasi,
        'alamat' => $request->alamat,
        'direktur' => $request->direktur,
        'admin' => $request->admin,
        'teller' => $request->teller,
      ];
      $find->update($payload);
      DB::commit();
      return response()->json(['msg' => 'Successfuly update setting setting', "data" => $payload, 'error' => null], 201);
    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json(['msg' => 'Failed update setting setting', "data" => null, 'error' => $e->getMessage()], 500);
    }
  }
}
