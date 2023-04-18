<?php

namespace App\Models;

use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LamaAngsuran extends Model
{
  use HasFactory;
  use Uuid;

  protected $table = 'lama_angsurans';
  protected $guarded = [];
  public $timestamps = false;
  protected $keyType = 'string';

  public function scopeFilter($query, array $filters)
  {
    $query->when($filters['search'] ?? false, function($query, $search){
      return $query->where('lama_angsuran', 'like', '%' . $search . '%');
    });
  }
}
