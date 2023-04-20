<?php

namespace App\Models;

use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nasabah extends Model
{
    use HasFactory;
    use Uuid;

  protected $guarded = [];
  public $timestamps = false;
  protected $keyType = "string";
  protected $table = "nasabahs";

  protected $hidden = [
    'password',
  ];

  public function scopeFilter($query, array $filters)
  {
    $query->when($filters['search'] ?? false, function($query, $search){
      return $query->where('id_nasabah', 'like', '%' . $search . '%')
              ->orWhere('nama_lengkap', 'like', '%' . $search . '%')
              ->orWhere('no_ktp', 'like', '%' . $search . '%')
              ->orWhere('inisial', 'like', '%' . $search . '%')
              ->orWhere('pekerjaan', 'like', '%' . $search . '%')
              ->orWhere('agama', 'like', '%' . $search . '%');
    });
  }
}
