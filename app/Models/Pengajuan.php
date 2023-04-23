<?php

namespace App\Models;

use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pengajuan extends Model
{
    use HasFactory;
    use Uuid;

  protected $table = 'pengajuan_pinjamans';
  protected $guarded = [];
  public $timestamps = false;
  protected $keyType = 'string';

  public function scopeFilter($query, array $filters)
  {
    $query->when($filters['search'] ?? false, function($query, $search){
      return $query->where('kode_pengajuan', 'like', '%' . $search . '%')
        ->orWhere('kode_pengajuan', 'like', '%' . $search . '%')
        ->orWhere('jumlah_pinjaman', 'like', '%' . $search . '%');
    });
  }

  public function jangkaWaktu() {
    return $this->belongsTo(LamaAngsuran::class, "jangka_waktu", "id");
  }

  public function marketing() {
    return $this->belongsTo(Marketing::class, "marketing", "id");
  }
}
