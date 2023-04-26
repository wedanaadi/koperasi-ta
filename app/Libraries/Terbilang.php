<?php

namespace App\Libraries;

class Terbilang
{
  public static function penyebut($nilai)
  {
    $nilai = abs($nilai);
    $huruf = array("", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas");
    $temp = "";
    if ($nilai < 12) {
      $temp = " " . $huruf[$nilai];
    } else if ($nilai < 20) {
      $temp = Terbilang::penyebut($nilai - 10) . " Belas";
    } else if ($nilai < 100) {
      $temp = Terbilang::penyebut($nilai / 10) . " Puluh" . Terbilang::penyebut($nilai % 10);
    } else if ($nilai < 200) {
      $temp = " Seratus" . Terbilang::penyebut($nilai - 100);
    } else if ($nilai < 1000) {
      $temp = Terbilang::penyebut($nilai / 100) . " Ratus" . Terbilang::penyebut($nilai % 100);
    } else if ($nilai < 2000) {
      $temp = " Seribu" . Terbilang::penyebut($nilai - 1000);
    } else if ($nilai < 1000000) {
      $temp = Terbilang::penyebut($nilai / 1000) . " Ribu" . Terbilang::penyebut($nilai % 1000);
    } else if ($nilai < 1000000000) {
      $temp = Terbilang::penyebut($nilai / 1000000) . " Juta" . Terbilang::penyebut($nilai % 1000000);
    } else if ($nilai < 1000000000000) {
      $temp = Terbilang::penyebut($nilai / 1000000000) . " Milyar" . Terbilang::penyebut(fmod($nilai, 1000000000));
    } else if ($nilai < 1000000000000000) {
      $temp = Terbilang::penyebut($nilai / 1000000000000) . " Trilyun" . Terbilang::penyebut(fmod($nilai, 1000000000000));
    }
    return $temp;
  }
  public static function string($nilai)
  {
    if ($nilai < 0) {
      $hasil = "minus " . trim(Terbilang::penyebut($nilai));
    } else {
      $hasil = trim(Terbilang::penyebut($nilai));
    }
    return $hasil.' Rupiah';
  }
}
