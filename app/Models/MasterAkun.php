<?php

namespace App\Models;

use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MasterAkun extends Model
{
    use HasFactory;
    use Uuid;

  protected $table = 'master_trx';
  protected $guarded = [];
  public $timestamps = false;
  protected $keyType = 'string';

  public function scopeFilter($query, array $filters)
  {
    $query->when($filters['search'] ?? false, function ($query, $search) {
      return $query->where('kode_transaksi', 'like', '%' . $search . '%')
        ->orWhere('keterangan', 'like', '%' . $search . '%');
    });
    $query->when($filters['periode'] ?? false, function ($query, $params) {
      $periode = explode(',', $params);
      return $query->whereRaw("tanggal >= '" . $periode[0] . "' AND tanggal < '" . $periode[1] . "' ");
    });
  }
}
