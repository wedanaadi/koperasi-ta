{!! $header !!}
<title>Bukti Transaksi</title>

<p style="font-size: 1.125rem; line-height:1.75rem; font-weight: 600; margin-top: 20px; margin-bottom: 60px;">
    <u>
        {{ $setting['judul'] }}
    </u>
</p>

<table border="0" width="100%">
  <tbody>
    <tr>
      <td style="width: 15%">Tanggal Transaksi</td>
      <td style="width: 1%">:</td>
      <td>{{ $setting['tanggal'] }}</td>
    </tr>
    <tr>
      <td>Nomor Transaksi</td>
      <td>:</td>
      <td>{{ $body['id'] }}</td>
    </tr>
    <tr>
      <td>ID Nasabah</td>
      <td>:</td>
      <td>{{ $body['simpanan']['nasabah']['id_nasabah'] }}</td>
    </tr>
    <tr>
      <td>Nama Nasabah</td>
      <td>:</td>
      <td>{{ $body['simpanan']['nasabah']['nama_lengkap'] }}</td>
    </tr>
    <tr>
      <td>Nama Nasabah</td>
      <td>:</td>
      <td>{{ $body['marketings']['nama_marketing'] }}</td>
    </tr>
    <tr>
      <td>Keterangan</td>
      <td>:</td>
      <td>{{ $body['keterangan'] }}</td>
    </tr>
    <tr>
      <td>Jenis Tabungan</td>
      <td>:</td>
      <td>{{ $body['simpanan']['jenis_simpanans']['nama_jenis_simpanan'] }}</td>
    </tr>
    <tr>
      <td>Jumlah</td>
      <td>:</td>
      <td>{{ number_format($body['saldo'],0,',','.') }}</td>
    </tr>
    <tr>
      <td>Terbilang</td>
      <td>:</td>
      <td>{{ $setting['terbilang'] }}</td>
    </tr>
  </tbody>
</table>

<table border="0" width="100%" style="margin-top: 30px;">
  <tbody>
    <tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td style="width: 20%">{{ $setting['lokasi'] }}, {{ date('d/m/Y') }}</td>
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
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>Paraf</td>
    </tr>
  </tbody>
</table>
