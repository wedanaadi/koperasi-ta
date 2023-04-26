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
              Kode Akun
          </th>
          <th>
              Nama Akun
          </th>
          <th>
              Debet
          </th>
          <th>
              Kredit
          </th>
      </tr>
  </thead>
  <tbody>
      @php
          $debet = 0;
          $kredit = 0;
      @endphp
      @foreach ($body['data'] as $rek)
          <tr>
              <td>
                  {{ $rek['no_akun'] }}
              </td>
              <td>
                  {{ $rek['jenis'] }}
              </td>
              <td style="text-align: right">
                  {{ number_format($rek['debet'], 0, ',', '.') }}
              </td>
              <td style="text-align: right">
                  {{ number_format($rek['kredit'], 0, ',', '.') }}
              </td>
          </tr>
          @php
              $debet+=$rek['debet'];
              $kredit+=$rek['kredit'];
          @endphp
      @endforeach
  </tbody>
  <tfoot>
    <tr>
      <td colspan="2">Total</td>
      <td style="text-align: right">
        {{ number_format($debet,0,',','.') }}
      </td>
      <td style="text-align: right">
        {{ number_format($kredit,0,',','.') }}
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
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>Paraf</td>
    </tr>
  </tbody>
</table>
