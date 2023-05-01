<?php

namespace App\Models;

use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kas extends Model
{
  use HasFactory;
  use Uuid;

  protected $table = 'transaksi_kas';
  protected $guarded = [];
  public $timestamps = false;
  protected $keyType = 'string';

  public function scopeFilter($query, array $filters)
  {
    $query->when($filters['search'] ?? false, function ($query, $search) {
      return $query->where('kode_transaksi', 'like', '%' . $search . '%')
        ->orWhere('keterangan', 'like', '%' . $search . '%')
        ->orWhereHas('untukAkun', function ($query) use ($search) {
          $query->where('jenis_transaksi', 'like', '%' . $search . '%');
        })->orWhereHas('dariAkun', function ($query) use ($search) {
          $query->where('jenis_transaksi', 'like', '%' . $search . '%');
        });
    });
    $query->when($filters['periode'] ?? false, function ($query, $params) {
      $periode = explode(',', $params);
      return $query->whereRaw("transaksi_kas.tanggal_transaksi >= '" . $periode[0] . "' AND transaksi_kas.tanggal_transaksi < '" . $periode[1] . "' ");
    });
  }

  public function untukAkun() {
    return $this->belongsTo(Akun::class, "untuk_akun", "id");
  }
  public function dariAkun() {
    return $this->belongsTo(Akun::class, "dari_akun", "id");
  }
}
