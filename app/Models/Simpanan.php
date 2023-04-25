<?php

namespace App\Models;

use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Simpanan extends Model
{
  use HasFactory;
  use Uuid;

  protected $table = 'simpanan';
  protected $guarded = [];
  public $timestamps = false;
  protected $keyType = 'string';

  public function nasabah() {
    return $this->belongsTo(Nasabah::class, "id_nasabah", "id_nasabah");
  }

  public function jenis_simpanan() {
    return $this->belongsTo(JenisSimpanan::class, "jenis_simpanan", "id");
  }

  public function scopeFilter($query, array $filters)
  {
    $query->when($filters['search'] ?? false, function ($query, $search) {
      return $query->where('id_nasabah', 'like', '%' . $search . '%');
    });
  }

  // public function setoran()
  // {
  //   return $this->belongsTo(Akun::class, "untuk_akun", "id");
  // }
}
