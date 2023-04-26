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
                Jenis Transaksi
            </th>
            <th>
                Keterangan
            </th>
            <th>
                Dari Akun
            </th>
            <th>
                Untuk Akun
            </th>
            <th>
                Jumlah
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="6" style="text-align: right">
                Sebelumnya
            </td>
            <td style="text-align: right">
                {{ number_format($body['prev'], 0, ',', '.') }}
            </td>
        </tr>
        @php
            $jumlah = 0;
        @endphp
        @foreach ($body['data'] as $rek)
            <tr>
                <td>
                    {{ $rek['kode_transaksi'] }}
                </td>
                <td>
                    {{ $rek['tanggal_transaksi'] }}
                </td>
                <td>
                    {{ $rek['jenis_transaksi'] }}
                </td>
                <td>
                    {{ $rek['keterangan'] }}
                </td>
                <td>
                    {{ $rek['dari_akun'] }}
                </td>
                <td>
                    {{ $rek['untuk_akun'] }}
                </td>
                <td style="text-align: right">
                    {{ number_format($rek['jumlah'], 0, ',', '.') }}
                </td>
            </tr>
            @php
                // $pokok+=$rek['pokok'];
            @endphp
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
      {{-- <td style="text-align: right">{{ $setting['teller'] }}</td> --}}
      <td>&nbsp;</td>
      <td>Paraf</td>
    </tr>
  </tbody>
</table>
