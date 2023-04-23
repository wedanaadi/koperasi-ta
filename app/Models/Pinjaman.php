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
  }

  public function jangkaWaktu() {
    return $this->belongsTo(LamaAngsuran::class, "jangka_waktu", "id");
  }
}
