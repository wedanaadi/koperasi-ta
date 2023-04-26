{!! $header !!}
<title>Bukti Transaksi</title>

<p style="font-size: 1.125rem; line-height:1.75rem; font-weight: 600; text-align:center; margin-top: 20px; margin-bottom: 60px;">
    <u>
        {{ $body['judul'] }}
    </u>
</p>

<table border="0" width="100%">
  <tbody>
    <tr>
      <td style="width: 15%">Diterima Dari</td>
      <td style="width: 1%">:</td>
      <td>{{ $body['dari'] }}</td>
    </tr>
    <tr>
      <td>Nominal Uang</td>
      <td>:</td>
      <td>{{ number_format($body['jumlah'],0,',','.') }}</td>
    </tr>
    <tr>
      <td>Keterangan</td>
      <td>:</td>
      <td>{{ $body['keterangan'] }}</td>
    </tr>
    <tr>
      <td>Terbilang</td>
      <td>:</td>
      <td>{{ $body['terbilang'] }}</td>
    </tr>
  </tbody>
</table>

<table border="0" width="100%" style="margin-top: 30px;">
  <tbody>
    <tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td style="width: 20%">{{ $body['lokasi'] }}, {{ $body['tanggal'] }}</td>
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
