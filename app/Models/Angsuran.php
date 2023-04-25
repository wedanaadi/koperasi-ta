<?php

namespace App\Models;

use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Angsuran extends Model
{
    use HasFactory;
    use Uuid;

  protected $table = 'angsurans';
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
}
