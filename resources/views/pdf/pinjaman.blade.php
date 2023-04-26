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
              No Pinjaman
          </th>
          <th>
              Tanggal Pinjaman
          </th>
          <th>
              Nama Nasabah
          </th>
          <th>
              Bakidebet
          </th>
          <th>
              Tagihan Pokok
          </th>
          <th>
              Tagihan Bunga
          </th>
      </tr>
  </thead>
  <tbody>
    @php
        $pokok = 0;
        $bunga = 0;
        $bakidebet = 0;
    @endphp
    @foreach ($body['data'] as $rek)
    <tr>
      <td>
          {{ $rek['no_pinjaman'] }}
      </td>
      <td>
          {{ $rek['tanggal_pinjaman'] }}
      </td>
      <td>
          {{ $rek['nama_nasabah'] }}
      </td>
      <td>
      {{ number_format($rek['bakidebet'],0,',','.') }}
      </td>
      <td>
        {{ number_format($rek['pokok'],0,',','.') }}
      </td>
      <td>
        {{ number_format($rek['bunga'],0,',','.') }}
      </td>
  </tr>
    @php
        $pokok+=$rek['pokok'];
        $bunga+=$rek['bunga'];
        $bakidebet+=$rek['bakidebet'];
    @endphp
    @endforeach
  </tbody>
  <tfoot>
    <tr>
      <td colspan="5">Total Tagihan Pokok</td>
      <td>
        {{ number_format($pokok,0,',','.') }}
      </td>
    </tr>
    <tr>
      <td colspan="5">Total Tagihan Bunga</td>
      <td>
        {{ number_format($bunga,0,',','.') }}
      </td>
    </tr>
    <tr>
      <td colspan="5">Total Seluruh (pokok + Bunga)</td>
      <td>
        {{ number_format($pokok+$bunga,0,',','.') }}
      </td>
    </tr>
  </tfoot>
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
      <td style="text-align: right">{{ $setting['teller'] }}</td>
      <td>&nbsp;</td>
      <td>{{ $setting['direktur'] }}</td>
    </tr>
  </tbody>
</table>
