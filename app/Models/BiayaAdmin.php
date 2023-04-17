<?php

namespace App\Models;

use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BiayaAdmin extends Model
{
    use HasFactory;
    use Uuid;

    protected $table = 'biaya_administrasi';
    protected $guarded = [];
    public $timestamps = false;
    protected $keyType = 'string';

    public function scopeFilter($query, array $filters)
    {
      $query->when($filters['search'] ?? false, function($query, $search){
        return $query->where('suku_bunga', 'like', '%' . $search . '%')
                ->orWhere('biaya_administrasi', 'like', '%' . $search . '%')
                ->orWhere('biaya_denda', 'like', '%' . $search . '%');
      });
    }
}
