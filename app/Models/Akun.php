<?php

namespace App\Models;

use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Akun extends Model
{
    use HasFactory;
    use Uuid;

    protected $table = 'akuns';
    protected $guarded = [];
    public $timestamps = false;
    protected $keyType = 'string';

    public function scopeFilter($query, array $filters)
    {
      $query->when($filters['search'] ?? false, function($query, $search){
        return $query->where('no_akun', 'like', '%' . $search . '%')
                ->orWhere('jenis_transaksi', 'like', '%' . $search . '%')
                ->orWhere('akun', 'like', '%' . $search . '%');
      });
    }
}
