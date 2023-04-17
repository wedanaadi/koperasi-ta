<?php

namespace App\Models;

use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Pegawai extends Authenticatable
{
  use HasApiTokens, HasFactory, Notifiable;
  use Uuid;

  protected $guarded = [];
  public $timestamps = false;
  protected $keyType = "string";
  protected $table = "pegawais";

  protected $hidden = [
    'password',
  ];

  public function scopeFilter($query, array $filters)
  {
    $query->when($filters['search'] ?? false, function($query, $search){
      return $query->where('nama_lengkap', 'like', '%' . $search . '%')
              ->orWhere('alamat', 'like', '%' . $search . '%')
              ->orWhere('no_telepon', 'like', '%' . $search . '%')
              ->orWhere('username', 'like', '%' . $search . '%')
              ->orWhere('jabatan', 'like', '%' . $search . '%');
    });
  }
}
