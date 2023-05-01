<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SimpananDetail extends Model
{
  use HasFactory;

  protected $table = 'simpanan_detail';
  protected $guarded = [];
  public $timestamps = false;
  protected $keyType = 'string';

  public function scopeFilter($query, array $filters)
  {
    $query->when($filters['search'] ?? false, function ($query, $search) {
      return $query->where('keterangan', 'like', '%' . $search . '%')
        ->orWhereHas('marketing', function ($query) use ($search) {
          $query->where('nama_marketing', 'like', '%' . $search . '%');
        })->orWhereHas('simpanan', function ($query) use ($search) {
          $query->where('id_nasabah', 'like', '%' . $search . '%');
        })->orWhereHas('simpanan.nasabah', function ($query) use ($search) {
          $query->where('nama_lengkap', 'like', '%' . $search . '%');
        });
    });
    $query->when($filters['periode'] ?? false, function ($query, $params) {
      $periode = explode(',', $params);
      return $query->whereRaw("simpanan_detail.tanggal_transaksi >= '" . $periode[0] . "' AND simpanan_detail.tanggal_transaksi < '" . $periode[1] . "' ");
    });
    $query->when($filters['tipe'] ?? false, function($query, $params){
      if($params != 'all') {
        return $query->where('type',$params == 'tarik' ? "0" : "1");
      }
    });
  }

  public function simpanan()
  {
    return $this->belongsTo(Simpanan::class, "simpanan_id", "id");
  }

  public function marketing()
  {
    return $this->belongsTo(Marketing::class, "marketing", "id");
  }
  public function marketings()
  {
    return $this->belongsTo(Marketing::class, "marketing", "id");
  }

  public function untuk_akun()
  {
    return $this->belongsTo(Akun::class, "untuk_akun", "id");
  }
}
