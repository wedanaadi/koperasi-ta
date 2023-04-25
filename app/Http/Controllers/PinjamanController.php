<?php

namespace App\Http\Controllers;

use App\Libraries\Fungsi;
use App\Models\Angsuran;
use App\Models\BiayaAdmin;
use App\Models\LamaAngsuran;
use App\Models\Nasabah;
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
      ->with('jangka_waktu')
      ->where('is_aktif', "1")
      ->OrderBy('no_pinjaman', 'ASC')
      ->paginate(request('perpage'));
    return response()->json(['msg' => 'Get data', "data" => $data, 'error' => []], 200);
  }

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

      $payloadMaster = [
        [
          'id' => Str::uuid()->toString(),
          'relasi_id' => $newID,
          'akun' => $request->simpan_akun,
          'debet' => $request->jumlah_pinjaman,
          'kredit' => 0,
          'tanggal' => $request->tanggal_pinjaman,
        ],
        [
          'id' => Str::uuid()->toString(),
          'relasi_id' => $newID,
          'akun' => $request->ambil_akun,
          'kredit' => $request->jumlah_pinjaman,
          'debet' => 0,
          'tanggal' => $request->tanggal_pinjaman,
        ]
      ];

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
          'jatuh_tempo' => (Carbon::createFromTimestamp($request->tanggal_pinjaman / 1000)->addMonths($i)->timestamp * 1000),
          'pokok' => round($besarPinjaman / $jangkaWaktu, 2),
          'bunga' => round($besarPinjaman * $sukuBunga, 2),
          'total' => round($besarPinjaman / $jangkaWaktu) + round($besarPinjaman * $sukuBunga),
          'created_at' => round(Carbon::now()->timestamp * 1000),
          'updated_at' => round(Carbon::now()->timestamp * 1000),
        ]);
      }
      DB::table('master_trx')->insert($payloadMaster);
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
      DB::table('master_trx')->where('relasi_id',$find->no_pinjaman)->delete();
      $payloadMaster = [
        [
          'id' => Str::uuid()->toString(),
          'relasi_id' => $find->no_pinjaman,
          'akun' => $request->simpan_akun,
          'debet' => $request->jumlah_pinjaman,
          'kredit' => 0,
          'tanggal' => $request->tanggal_pinjaman,
        ],
        [
          'id' => Str::uuid()->toString(),
          'relasi_id' => $find->no_pinjaman,
          'akun' => $request->ambil_akun,
          'kredit' => $request->jumlah_pinjaman,
          'debet' => 0,
          'tanggal' => $request->tanggal_pinjaman,
        ]
      ];

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
          'jatuh_tempo' => (Carbon::createFromTimestamp($request->tanggal_pinjaman / 1000)->addMonths($i)->timestamp * 1000),
          'pokok' => round($besarPinjaman / $jangkaWaktu, 2),
          'bunga' => round($besarPinjaman * $sukuBunga, 2),
          'total' => round($besarPinjaman / $jangkaWaktu) + round($besarPinjaman * $sukuBunga),
          'created_at' => round(Carbon::now()->timestamp * 1000),
          'updated_at' => round(Carbon::now()->timestamp * 1000),
        ]);
      }
      DB::table('master_trx')->insert($payloadMaster);
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

  public function list_pinjaman()
  {
    $pinjaman = Pinjaman::filter(request(['search']))
      ->where('is_aktif', "1")
      ->where('status', "0")
      ->OrderBy('no_pinjaman', 'ASC')
      ->get();

    $data = [];
    foreach ($pinjaman as $p) {
      $besarPinjaman = (int)$p->jumlah_pinjaman;
      $sukuBunga = ((int)$p->suku_bunga / 100) / 12;
      $jangkaWaktu = (int)LamaAngsuran::find($p->jangka_waktu)->lama_angsuran;
      $isAnggota = Nasabah::where('id_nasabah', $p->id_nasabah)->first()->jabatan;
      if ($isAnggota === 'bukan') {
        $denda = BiayaAdmin::find('ba-2')->biaya_denda;
      } else {
        $denda = BiayaAdmin::find('ba-1')->biaya_denda;
      }
      array_push($data, [
        'no_pinjaman' => $p->no_pinjaman,
        'nama_nasabah' => $p->nama_nasabah,
        'id_nasabah' => $p->id_nasabah,
        'tanggal_pinjaman' => $p->tanggal_pinjaman,
        'bakidebet' => $p->jumlah_pinjaman,
        'pokok' => round($besarPinjaman / $jangkaWaktu, 2),
        'bunga' => round($besarPinjaman * $sukuBunga, 2),
        'denda' => $denda,
        'jangka_waktu' => $jangkaWaktu,
        'suku_bunga' => $p->suku_bunga,
        'jatuh_tempo' => Carbon::createFromTimestamp($p->tanggal_pinjaman / 1000)->format('d')
      ]);
    }
    $data = $this->paginateCustom($data, 10);
    return response()->json(['msg' => 'Get data', "data" => $data, 'error' => []], 200);
  }

  public function paginateCustom($items, $perPage = 5, $page = null, $options = [])
  {
    $page = $page ?: (Paginator::resolveCurrentPage() ?: 1);
    $items = $items instanceof Collection ? $items : Collection::make($items);
    return new LengthAwarePaginator($items->forPage($page, $perPage), $items->count(), $perPage, $page, $options);
  }

  public function riwayat_pinjaman()
  {
    $riwayat = Pinjaman::filter(request(['search']))
      ->with('jangka_waktu')
      ->where('is_aktif', "1")
      ->where('status', "1")
      ->OrderBy('no_pinjaman', 'ASC')
      ->get();

    $data = [];
    foreach ($riwayat as $p) {
      $besarPinjaman = (int)$p->jumlah_pinjaman;
      $sukuBunga = ((int)$p->suku_bunga / 100) / 12;
      $jangkaWaktu = (int)LamaAngsuran::find($p->jangka_waktu)->lama_angsuran;
      $isAnggota = Nasabah::where('id_nasabah', $p->id_nasabah)->first()->jabatan;
      if ($isAnggota === 'bukan') {
        $denda = BiayaAdmin::find('ba-2')->biaya_denda;
      } else {
        $denda = BiayaAdmin::find('ba-1')->biaya_denda;
      }
      array_push($data, [
        'no_pinjaman' => $p->no_pinjaman,
        'nama_nasabah' => $p->nama_nasabah,
        'id_nasabah' => $p->id_nasabah,
        'tanggal_pinjaman' => $p->tanggal_pinjaman,
        'bakidebet' => $p->jumlah_pinjaman,
        'pokok' => round($besarPinjaman / $jangkaWaktu, 2),
        'bunga' => round($besarPinjaman * $sukuBunga, 2),
        'denda' => $denda,
        'jangka_waktu' => $jangkaWaktu,
        'suku_bunga' => $p->suku_bunga,
        'jatuh_tempo' => Carbon::createFromTimestamp($p->tanggal_pinjaman / 1000)->format('d')
      ]);
    }
    $data = $this->paginateCustom($data, request('perpage'));
    return response()->json(['msg' => 'Get data', "data" => $data, 'error' => []], 200);
  }

  public function lap_pinjaman()
  {
    $pinjaman = Pinjaman::filter(request(['search', 'periode']))
      ->with('jangka_waktu')
      ->where('is_aktif', "1")
      ->OrderBy('no_pinjaman', 'ASC')->get();

    $data = [];
    foreach ($pinjaman as $p) {
      $besarPinjaman = (int)$p->jumlah_pinjaman;
      $sukuBunga = ((int)$p->suku_bunga / 100) / 12;
      $jangkaWaktu = (int)LamaAngsuran::find($p->jangka_waktu)->lama_angsuran;
      $isAnggota = Nasabah::where('id_nasabah', $p->id_nasabah)->first()->jabatan;
      if ($isAnggota === 'bukan') {
        $denda = BiayaAdmin::find('ba-2')->biaya_denda;
      } else {
        $denda = BiayaAdmin::find('ba-1')->biaya_denda;
      }
      $tunggakanPokok = 0;
      $tunggakanBunga = 0;
      $isDenda = 0;
      $pokokBayar = 0;
      $bungaBayar = 0;
      $dendaBayar = 0;
      $now = Carbon::now()->toDateString();
      $epoch = Carbon::parse($now)->timestamp * 1000;
      $simulasi = SimulasiAngsuran::where('pinjaman_id', $p->no_pinjaman)->where('jatuh_tempo', '<=', $epoch);
      $angsuranBayar = Angsuran::where('no_pinjaman', $p->no_pinjaman);
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
          $dendaBayar += $a->denda_bayar;
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
      $isAnggota = Nasabah::where('id_nasabah', Pinjaman::where('no_pinjaman', $p->no_pinjaman)->first()->id_nasabah)->first()->jabatan;
      if ($isAnggota === 'bukan') {
        $denda = BiayaAdmin::find('ba-2')->biaya_denda;
      } else {
        $denda = BiayaAdmin::find('ba-1')->biaya_denda;
      }

      array_push($data, [
        'no_pinjaman' => $p->no_pinjaman,
        'nama_nasabah' => $p->nama_nasabah,
        'id_nasabah' => $p->id_nasabah,
        'tanggal_pinjaman' => $p->tanggal_pinjaman,
        'bakidebet' => $p->jumlah_pinjaman,
        'pokok' => round($besarPinjaman / $jangkaWaktu, 2),
        'bunga' => round($besarPinjaman * $sukuBunga, 2),
        'denda' => $denda,
        'jangka_waktu' => $jangkaWaktu,
        'suku_bunga' => $p->suku_bunga,
        'jatuh_tempo' => Carbon::createFromTimestamp($p->tanggal_pinjaman / 1000)->format('d'),
        'tunggakan_pokok' => round($tunggakanPokok, 2),
        'tunggakan_bunga' => round($tunggakanBunga, 2),
        'kena_denda' => $isDenda,
        'denda' => $denda,
        'sisa_pinjaman' => $besarPinjaman - $pokokBayar,
        'pokok_bayar' => $pokokBayar,
        'bunga_bayar' => $bungaBayar,
        'denda_bayar' => $dendaBayar,
      ]);
    }
    // ->paginate(request('perpage'));
    $data = $this->paginateCustom($data, request('perpage'));
    return response()->json(['msg' => 'Get data', "data" => $data, 'error' => []], 200);
  }
}
