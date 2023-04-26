{!! $header !!}
<title>Bukti Transaksi</title>

<p style="font-size: 1.125rem; line-height:1.75rem; font-weight: 600; text-align:center; margin-top: 20px; margin-bottom: 60px;">
    <u>
        {{ $setting['judul'] }}
    </u>
</p>

<table border="0" width="100%">
  <tbody>
    <tr>
      <td style="width: 15%">Tanggal Transaksi</td>
      <td style="width: 1%">:</td>
      <td style="width: 15%">{{ $body['tanggal_transaksi'] }}</td>
      <td style="width: 3%"></td>
      <td style="width: 15%"></td>
      <td style="width: 1%"></td>
      <td></td>
      <td style="width: 10%"></td>
    </tr>
    <tr>
      <td style="width: 15%">Kode Transaksi</td>
      <td style="width: 1%">:</td>
      <td style="width: 15%">{{ $body['kode_transaksi'] }}</td>
      <td style="width: 3%"></td>
      <td style="width: 15%"></td>
      <td style="width: 1%"></td>
      <td></td>
      <td style="width: 10%"></td>
    </tr>
    <tr>
      <td style="width: 15%">ID Nasabah</td>
      <td style="width: 1%">:</td>
      <td style="width: 15%">{{ $body['id_nasabah'] }}</td>
      <td style="width: 3%"></td>
      <td style="width: 15%"></td>
      <td style="width: 1%"></td>
      <td></td>
      <td style="width: 10%"></td>
    </tr>
    <tr>
      <td style="width: 15%">Nama Nasabah</td>
      <td style="width: 1%">:</td>
      <td style="width: 15%">{{ $body['nasabah'] }}</td>
      <td style="width: 3%"></td>
      <td style="width: 15%"></td>
      <td style="width: 1%"></td>
      <td></td>
      <td style="width: 10%"></td>
    </tr>
    <tr>
      <td style="width: 15%">No Pinjaman</td>
      <td style="width: 1%">:</td>
      <td style="width: 15%">{{ $body['no_pinjaman'] }}</td>
      <td style="width: 3%"></td>
      <td style="width: 15%"></td>
      <td style="width: 1%"></td>
      <td></td>
      <td style="width: 10%"></td>
    </tr>
    <tr>
      <td style="width: 15%">Marketing</td>
      <td style="width: 1%">:</td>
      <td style="width: 15%">{{ $body['marketing'] }}</td>
      <td style="width: 3%"></td>
      <td style="width: 15%"></td>
      <td style="width: 1%"></td>
      <td></td>
      <td style="width: 10%"></td>
    </tr>
    <tr>
      <td style="width: 15%">Pembayaran Ke</td>
      <td style="width: 1%">:</td>
      <td style="width: 15%">{{ $body['pembayaranKe'] }}</td>
      <td style="width: 3%"></td>
      <td style="width: 15%"></td>
      <td style="width: 1%"></td>
      <td></td>
      <td style="width: 10%"></td>
    </tr>
    <tr>
      <td style="width: 15%">Tagihan Pokok</td>
      <td style="width: 1%">:</td>
      <td>{{ number_format($body['pokok'],0,',','.') }}</td>
      <td style="width: 3%"></td>
      <td style="width: 15%"></td>
      <td style="width: 1%"></td>
      <td></td>
      <td style="width: 10%"></td>
    </tr>
    <tr>
      <td style="width: 15%">Tagihan Bunga</td>
      <td style="width: 1%">:</td>
      <td>{{ number_format($body['bunga'],0,',','.') }}</td>
      <td style="width: 3%"></td>
      <td style="width: 15%">Bayar Denda</td>
      <td style="width: 1%">:</td>
      <td>{{ number_format($body['denda_bayar'],0,',','.') }}</td>
      <td style="width: 10%"></td>
    </tr>
    <tr>
      <td style="width: 15%">Denda</td>
      <td style="width: 1%">:</td>
      <td>{{ number_format($body['denda'],0,',','.') }}</td>
      <td style="width: 3%"></td>
      <td style="width: 15%">Bayar Pokok</td>
      <td style="width: 1%">:</td>
      <td>{{ number_format($body['pokok_bayar'],0,',','.') }}</td>
      <td style="width: 10%"></td>
    </tr>
    <tr>
      <td style="width: 15%">Tunggakan Pokok</td>
      <td style="width: 1%">:</td>
      <td>{{ number_format($body['pokok_tunggakan'],0,',','.') }}</td>
      <td style="width: 3%"></td>
      <td style="width: 15%">Bayar Bunga</td>
      <td style="width: 1%">:</td>
      <td>{{ number_format($body['bunga_bayar'],0,',','.') }}</td>
      <td style="width: 10%"></td>
    </tr>
    <tr>
      <td style="width: 15%">Tunggakan Bunga</td>
      <td style="width: 1%">:</td>
      <td>{{ number_format($body['bunga_tunggakan'],0,',','.') }}</td>
      <td style="width: 3%"></td>
      <td style="width: 15%">Total Bayar</td>
      <td style="width: 1%">:</td>
      <td>{{ number_format($body['total_bayar'],0,',','.') }}</td>
      <td style="width: 10%"></td>
    </tr>
    <tr>
      <td style="width: 15%">Terbilang</td>
      <td style="width: 1%">:</td>
      <td colspan="6">{{ $body['terbilang'] }}</td>
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
      <td>&nbsp;</td>
      {{-- <td style="text-align: right">{{ $setting['direktur'] }}</td> --}}
      <td>&nbsp;</td>
      <td>Paraf</td>
    </tr>
  </tbody>
</table>
