<?php
namespace App\Traits;
use Illuminate\Support\Str;

// !NOTE: ini untuk membuat unique id (UUID)
trait Uuid {
  protected static function boot() {
    parent::boot();
    static::creating(function($model){
      if(!$model->getKey()){
        $model->setAttribute($model->getKeyName(),Str::uuid()->toString());
      }
    });
  }

  public function getIncrementing()
  {
    # code...
  }

  public function getKeyType()
  {
    return 'string';
  }
}
