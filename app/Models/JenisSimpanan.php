<?php

namespace App\Models;

use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JenisSimpanan extends Model
{
  use HasFactory;
  use Uuid;

  protected $table = 'jenis_simpanans';
  protected $guarded = [];
  public $timestamps = false;
  protected $keyType = 'string';

  public function scopeFilter($query, array $filters)
  {
    $query->when($filters['search'] ?? false, function ($query, $search) {
      return $query->where('nama_jenis_simpanan', 'like', '%' . $search . '%')
              ->orWhere('saldo_minimal', 'like', '%' . $search . '%');
    });
  }
}
