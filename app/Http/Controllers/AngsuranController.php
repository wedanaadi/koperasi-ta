<?php

namespace App\Http\Controllers;

use App\Libraries\Fungsi;
use App\Models\Angsuran;
use App\Models\BiayaAdmin;
use App\Models\Nasabah;
use App\Models\Pinjaman;
use App\Models\SimulasiAngsuran;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AngsuranController extends Controller
{
  public function index()
  {
    $data = Angsuran::OrderBy('pembayaran_ke', 'Desc')
      ->where('no_pinjaman',request('pinjaman'))
      ->paginate(request('perpage'));
    return response()->json(['msg' => 'Get data', "data" => $data, 'error' => []], 200);
  }

  public function angsuran_pinjaman()
  {
    $data = Angsuran::OrderBy('pembayaran_ke', 'ASC')
      ->where('no_pinjaman',request('pinjaman'))
      ->get();
    return response()->json(['msg' => 'Get data', "data" => $data, 'error' => []], 200);
  }

  public function simulasi()
  {
    $data = SimulasiAngsuran::OrderBy('bulan', 'ASC')
      ->where('pinjaman_id',request('pinjaman'))
      ->get();
    return response()->json(['msg' => 'Get data', "data" => $data, 'error' => []], 200);
  }

  public function profile($id)
  {
    $jumlahPinjaman = Pinjaman::where('no_pinjaman', $id)->first()->jumlah_pinjaman;
    $angsuranBayar = Angsuran::where('no_pinjaman', $id);
    $now = Carbon::now()->toDateString();
    $epoch = Carbon::parse($now)->timestamp * 1000;
    $simulasi = SimulasiAngsuran::where('pinjaman_id', $id)->where('jatuh_tempo', '<=', $epoch);
    $tunggakanPokok = 0;
    $tunggakanBunga = 0;
    $isDenda = 0;
    $pokokBayar = 0;
    $bungaBayar = 0;
    if ($simulasi->count() > 0) {
      foreach ($simulasi->get() as $s) {
        $tunggakanPokok += $s->pokok;
        $tunggakanBunga += $s->bunga;
      }
      $isDenda = 1;
    }
    if ($angsuranBayar->count() > 0) {
      foreach ($angsuranBayar->get() as $a) {
        $pokokBayar += $a->pokok_bayar;
        $bungaBayar += $a->bunga_bayar;
      }
      $tunggakanPokok =  $tunggakanPokok - $pokokBayar;
      $tunggakanBunga =  $tunggakanBunga - $bungaBayar;
      if ((int)$tunggakanPokok <= 0 and (int)$tunggakanBunga <= 0) {
        $isDenda = 0;
      }
      if ((int)$tunggakanPokok < 0 or (int)$tunggakanBunga < 0) {
        $tunggakanPokok = 0;
        $tunggakanBunga = 0;
      }
    }
    $isAnggota = Nasabah::where('id_nasabah', Pinjaman::where('no_pinjaman', $id)->first()->id_nasabah)->first()->jabatan;
    if ($isAnggota === 'bukan') {
      $denda = BiayaAdmin::find('ba-2')->biaya_denda;
    } else {
      $denda = BiayaAdmin::find('ba-1')->biaya_denda;
    }
    $data = [
      'tunggakan_pokok' => round($tunggakanPokok, 2),
      'tunggakan_bunga' => round($tunggakanBunga, 2),
      'kena_denda' => $isDenda,
      'denda' => $denda,
      'sisa_pinjaman' => $jumlahPinjaman - $pokokBayar
    ];
    return response()->json(['msg' => 'Get data', "data" => $data, 'error' => []], 200);
  }

  public function store(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'tanggal_transaksi' => 'required',
      'bayar_pokok' => 'required',
      'bayar_denda' => 'required',
      'bayar_bunga' => 'required',
      'marketing' => 'required',
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
      $date = date('y') . date('m');
      $lastKode = Angsuran::select(DB::raw('MAX(kode_transaksi) AS kode'))
        ->where(DB::raw('SUBSTR(kode_transaksi,3,4)'), $date)
        ->first();
      $newID = Fungsi::KodeGenerate($lastKode->kode, 5, 6, 'AP', $date);

      $checkAngsuran = Angsuran::where('no_pinjaman', $request->no_pinjaman);
      if ($checkAngsuran->count() > 0) {
        $pembayaranKe = $checkAngsuran->max('pembayaran_ke') + 1;
      } else {
        $pembayaranKe = 1;
      }

      $pokokHarusBayar = $request->tunggakan_pokok > 0 ? $request->tunggakan_pokok : $request->pokok;
      $bungaHarusBayar = $request->tunggakan_bunga > 0 ? $request->tunggakan_bunga : $request->bunga;

      $payload = [
        'kode_transaksi' => $newID,
        'no_pinjaman' => $request->no_pinjaman,
        'pembayaran_ke' => $pembayaranKe,
        'pokok' => $request->pokok,
        'bunga' => $request->bunga,
        'pokok_tunggakan' => $request->tunggakan_pokok,
        'bunga_tunggakan' => $request->tunggakan_bunga,
        'denda' => $request->denda,
        'pokok_bayar' => $request->bayar_pokok,
        'bunga_bayar' => $request->bayar_bunga,
        'denda_bayar' => $request->bayar_denda,
        'sisa_pokok_bayar' => round($pokokHarusBayar - $request->bayar_pokok, 2),
        'sisa_bunga_bayar' => round($bungaHarusBayar - $request->bayar_bunga, 2),
        'ambil_akun' => $request->ambil_akun,
        'simpan_akun' => $request->simpan_akun,
        'marketing' => $request->marketing,
        'tanggal_transaksi' => $request->tanggal_transaksi,
        'created_at' => round(Carbon::now()->timestamp * 1000),
        'updated_at' => round(Carbon::now()->timestamp * 1000),
      ];

      $payloadMaster = [
        [
          'id' => Str::uuid()->toString(),
          'relasi_id' => $newID,
          'akun' => $request->simpan_akun,
          'debet' => $request->bayar_pokok+$request->bayar_bunga+$request->bayar_denda,
          'kredit' => 0,
          'tanggal' => $request->tanggal_transaksi,
        ],
        [
          'id' => Str::uuid()->toString(),
          'relasi_id' => $newID,
          'akun' => $request->ambil_akun,
          'kredit' => $request->bayar_pokok+$request->bayar_bunga+$request->bayar_denda,
          'debet' => 0,
          'tanggal' => $request->tanggal_transaksi,
        ]
      ];
      DB::table('master_trx')->insert($payloadMaster);

      Angsuran::create($payload);
      $pinjaman = Pinjaman::where('no_pinjaman', $request->no_pinjaman);
      $jumlahPinjaman = $pinjaman->first()->jumlah_pinjaman;
      $jumlahBayarAngsuran = 0;
      $angsuran = Angsuran::where('no_pinjaman', $request->no_pinjaman)->get();
      foreach ($angsuran as $value) {
        $jumlahBayarAngsuran += $value->pokok_bayar;
      }
      $sisaPinjaman = $jumlahPinjaman - $jumlahBayarAngsuran;

      if ((int)$sisaPinjaman < 1000) {
        $pinjaman->update([
          'status' => '1'
        ]);
      }
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
      'bayar_pokok' => 'required',
      'bayar_denda' => 'required',
      'bayar_bunga' => 'required',
      'marketing' => 'required',
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

    $find = Angsuran::find($id);
    DB::beginTransaction();
    try {
      DB::table('master_trx')->where('relasi_id',$find->kode_transaksi)->delete();
      $pokokHarusBayar = $request->tunggakan_pokok > 0 ? $request->tunggakan_pokok : $request->pokok;
      if ($request->tunggakan_bunga > 0) {
        $bungaHarusBayar = $request->tunggakan_bunga;
      } else if ($request->tunggakan_pokok > 0 and $request->tunggakan_bunga == 0) {
        $bungaHarusBayar = 0;
      } else {
        $bungaHarusBayar = $request->bunga;
      }

      $payload = [
        'no_pinjaman' => $find->no_pinjaman,
        'pembayaran_ke' => $find->pembayaran_ke,
        'pokok' => $request->pokok,
        'bunga' => $request->bunga,
        'pokok_tunggakan' => $request->tunggakan_pokok,
        'bunga_tunggakan' => $request->tunggakan_bunga,
        'denda' => $request->denda,
        'pokok_bayar' => $request->bayar_pokok,
        'bunga_bayar' => $request->bayar_bunga,
        'denda_bayar' => $request->bayar_denda,
        'sisa_pokok_bayar' => round($pokokHarusBayar - $request->bayar_pokok, 2),
        'sisa_bunga_bayar' => round($bungaHarusBayar - $request->bayar_bunga, 2),
        'ambil_akun' => $request->ambil_akun,
        'simpan_akun' => $request->simpan_akun,
        'marketing' => $request->marketing,
        'tanggal_transaksi' => $request->tanggal_transaksi,
        'updated_at' => round(Carbon::now()->timestamp * 1000),
      ];

      $payloadMaster = [
        [
          'id' => Str::uuid()->toString(),
          'relasi_id' => $find->kode_transaksi,
          'akun' => $request->simpan_akun,
          'debet' => $request->bayar_pokok+$request->bayar_bunga+$request->bayar_denda,
          'kredit' => 0,
          'tanggal' => $request->tanggal_transaksi,
        ],
        [
          'id' => Str::uuid()->toString(),
          'relasi_id' => $find->kode_transaksi,
          'akun' => $request->ambil_akun,
          'kredit' => $request->bayar_pokok+$request->bayar_bunga+$request->bayar_denda,
          'debet' => 0,
          'tanggal' => $request->tanggal_transaksi,
        ]
      ];
      DB::table('master_trx')->insert($payloadMaster);

      $find->update($payload);
      $pinjaman = Pinjaman::where('no_pinjaman', $find->no_pinjaman);
      $jumlahPinjaman = $pinjaman->first()->jumlah_pinjaman;
      $jumlahBayarAngsuran = 0;
      $angsuran = Angsuran::where('no_pinjaman', $find->no_pinjaman)->get();
      foreach ($angsuran as $value) {
        $jumlahBayarAngsuran += $value->pokok_bayar;
      }
      $sisaPinjaman = $jumlahPinjaman - $jumlahBayarAngsuran;

      if ((int)$sisaPinjaman < 1000) {
        $pinjaman->update([
          'status' => '1'
        ]);
      }
      DB::commit();
      return response()->json(['msg' => 'Successfuly created data', "data" => $payload, 'error' => null], 201);
    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json(['msg' => 'Failed created data', "data" => null, 'error' => $e->getMessage()], 500);
    }
  }
}
