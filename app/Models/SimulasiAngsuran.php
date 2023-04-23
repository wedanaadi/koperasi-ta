<?php

namespace App\Models;

use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SimulasiAngsuran extends Model
{
  use HasFactory;
  use Uuid;

  protected $table = 'angsuran_simulasi';
  protected $guarded = [];
  public $timestamps = false;
  protected $keyType = 'string';
}
