{!! $header !!}
<title>Bukti Transaksi</title>

<p style="font-size: 1.125rem; line-height:1.75rem; font-weight: 600; text-align:center; margin-top: 20px; margin-bottom: 60px;">
    <u>
        {{ $setting['judul'] }}
    </u>
</p>

<span>Nasabah "{{ $body['nasabah'] }}" Telah terima dari Koperasi Karya Utama Mandiri</span><br/>
<span>Pada Tanggal {{ $body['tanggal_pinjaman'] }} untuk realisasi pinjaman kredit sebesar Rp. {{ number_format($body['jumlah'],0,',','.') }} (nominl)</span><br/>
<span>dengan rincian</span>

<table border="0" width="100%">
  <tbody>
    <tr>
      <td style="width: 15%">No Pinjaman</td>
      <td style="width: 1%">:</td>
      <td>{{ $body['no_pinjaman'] }}</td>
    </tr>
    <tr>
      <td style="width: 15%">ID Nasabah</td>
      <td style="width: 1%">:</td>
      <td>{{ $body['id_nasabah'] }}</td>
    </tr>
    <tr>
      <td style="width: 15%">Nama Nasabah</td>
      <td style="width: 1%">:</td>
      <td>{{ $body['nasabah'] }}</td>
    </tr>
    <tr>
      <td style="width: 15%">Alamat</td>
      <td style="width: 1%">:</td>
      <td>{{ $body['alamat'] }}</td>
    </tr>
    <tr>
      <td style="width: 15%">Tanggal Pinjaman</td>
      <td style="width: 1%">:</td>
      <td>{{ $body['tanggal_pinjaman'] }}</td>
    </tr>
    <tr>
      <td style="width: 15%">Jatuh Tempo</td>
      <td style="width: 1%">:</td>
      <td>{{ $body['jatuh_tempo'] }}</td>
    </tr>
    <tr>
      <td style="width: 15%">Jangka Waktu</td>
      <td style="width: 1%">:</td>
      <td>{{ $body['jangka_waktu'] }}</td>
    </tr>
    <tr>
      <td style="width: 15%">Suku Bunga / Tahun</td>
      <td style="width: 1%">:</td>
      <td>{{ $body['suku_bunga'] }} %</td>
    </tr>
    <tr>
      <td>Total Pinjaman</td>
      <td>:</td>
      <td>{{ number_format($body['jumlah'],0,',','.') }}</td>
    </tr>
    <tr>
      <td>Angsuran Pokok</td>
      <td>:</td>
      <td>{{ number_format($body['pokok'],0,',','.') }}</td>
    </tr>
    <tr>
      <td>Angsuran Bunga</td>
      <td>:</td>
      <td>{{ number_format($body['bunga'],0,',','.') }}</td>
    </tr>
    <tr>
      <td>Biaya Admin</td>
      <td>:</td>
      <td>{{ number_format($body['biaya'],0,',','.') }}</td>
    </tr>
    <tr>
      <td style="width: 15%">Terbilang</td>
      <td style="width: 1%">:</td>
      <td>{{ $body['terbilang'] }}</td>
    </tr>
  </tbody>
</table>

<table border="0" width="100%" style="margin-top: 30px;">
  <tbody>
    <tr>
      <td>&nbsp;</td>
      <td style="width: 25%">&nbsp;</td>
      <td style="width: 25%">&nbsp;</td>
      <td style="width: 25%">{{ $setting['lokasi'] }}, {{ date('d/m/Y') }}</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td style="text-align: right">{{ $setting['direktur'] }}</td>
      <td>&nbsp;</td>
      <td>{{ $body['nasabah'] }}</td>
    </tr>
  </tbody>
</table>
