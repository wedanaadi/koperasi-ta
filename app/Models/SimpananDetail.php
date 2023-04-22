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
    $query->when($filters['search'] ?? false, function($query, $search){
      return $query->where('keterangan', 'like', '%' . $search . '%');
    });
  }

  public function simpanan() {
    return $this->belongsTo(Simpanan::class, "simpanan_id", "id");
  }

  public function marketing() {
    return $this->belongsTo(Marketing::class, "marketing", "id");
  }

  public function untuk_akun() {
    return $this->belongsTo(Akun::class, "untuk_akun", "id");
  }
}
