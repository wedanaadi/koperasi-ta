<?php

namespace App\Models;

use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Marketing extends Model
{
    use HasFactory;
    use Uuid;

    protected $table = 'marketings';
    protected $guarded = [];
    public $timestamps = false;
    protected $keyType = 'string';

    public function scopeFilter($query, array $filters)
    {
      $query->when($filters['search'] ?? false, function($query, $search){
        return $query->where('nama_marketing', 'like', '%' . $search . '%')
                ->orWhere('inisial', 'like', '%' . $search . '%')
                ->orWhere('no_telepon', 'like', '%' . $search . '%');
      });
    }
}
