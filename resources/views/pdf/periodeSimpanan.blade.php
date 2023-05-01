{!! $header !!}
<title>Bukti Transaksi</title>

<p style="font-size: 1.125rem; line-height:1.75rem; text-align: center; font-weight: 600; margin-top: 20px;">
  {{ $setting['judul'] }}
</p>
<p style="font-size: 1.125rem; line-height:1.75rem; text-align: center; font-weight: 600;">
  Periode {{ $body['periode']['start'] }} - {{ $body['periode']['end'] }}
</p>

<table style="width: 100%; margin-top: 30px; border-collapse: collapse; border:2px solid #000;" border="1">
  <thead>
    <tr>
      <th>
        Kode Transaksi
      </th>
      <th>
        Tanggal Transaksi
      </th>
      <th>
        Nama Nasabah
      </th>
      <th>
        Dept
      </th>
      <th>
        Jenis Simpanan
      </th>
      <th>
        Tipe Transaksi
      </th>
      <th>
        Nominal
      </th>
    </tr>
  </thead>
  <tbody>
    @foreach ($body['data'] as $rek)
    <tr>
      <td>
        {{ $rek['id'] }}
      </td>
      <td>
        {!! \Carbon\Carbon::parse($rek['tanggal_transaksi'] / 1000)->format('d/m/Y') !!}
      </td>
      <td>
        {{ $rek['simpanan']['nasabah']['nama_lengkap'] }}
      </td>
      <td>
        {{ $rek['marketings']['nama_marketing'] }}
      </td>
      <td>
        {{ $rek['simpanan']['jenis_simpanans']['nama_jenis_simpanan'] }}
      </td>
      <td>
        {{ $rek['type'] == "0" ? 'Penarikan' : 'Penyetoran' }}
      </td>
      <td>
        {{ number_format($rek['saldo'],0,',','.') }}
      </td>
    </tr>
    @endforeach
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
      <!-- <td style="text-align: right">{{ $setting['teller'] }}</td> -->
      <td>&nbsp;</td>
      <td>{{ $setting['direktur'] }}</td>
    </tr>
  </tbody>
</table>