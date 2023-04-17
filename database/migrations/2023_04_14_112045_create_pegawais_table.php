<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('pegawais', function (Blueprint $table) {
      $table->uuid('id')->primary();
      $table->string('nama_lengkap',35);
      $table->string('alamat',100);
      $table->string('no_handphone',20);
      $table->string('username')->unique();
      $table->string('password')->nullable();
      $table->string('jabatan',20);
      $table->bigInteger('created_at');
      $table->bigInteger('updated_at');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('pegawais');
  }
};
