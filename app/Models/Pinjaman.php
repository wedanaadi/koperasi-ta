<?php

namespace App\Models;

use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pinjaman extends Model
{
  use HasFactory;
  use Uuid;

  protected $table = 'pinjamans';
  protected $guarded = [];
  public $timestamps = false;
  protected $keyType = 'string';

  public function scopeFilter($query, array $filters)
  {
    $query->when($filters['search'] ?? false, function ($query, $search) {
      return $query->where('no_pinjaman', 'like', '%' . $search . '%')
        ->orWhere('id_nasabah', 'like', '%' . $search . '%')
        ->orWhere('nama_nasabah', 'like', '%' . $search . '%');
    });
    $query->when($filters['periode'] ?? false, function ($query, $params) {
      $periode = explode(',', $params);
      return $query->whereRaw("pinjamans.tanggal_pinjaman >= '" . $periode[0] . "' AND pinjamans.tanggal_pinjaman < '" . $periode[1] . "' ");
    });
  }

  public function jangka_waktu() {
    return $this->belongsTo(LamaAngsuran::class, "jangka_waktu", "id");
  }
}
