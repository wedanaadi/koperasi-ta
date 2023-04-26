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
                Simpanan
            </th>
            <th>
                jenis Akun
            </th>
            <th>
                Setoran
            </th>
            <th>
                Penarikan
            </th>
            <th>
                Jumlah
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                {{ $body['data']['simpanan_pokok']['jenis'] }}
            </td>
            <td>
                {{ $body['data']['simpanan_pokok']['akun'] }}
            </td>
            <td>
                {{ number_format($body['data']['simpanan_pokok']['penyetoran'], 0, ',', '.') }}
            </td>
            <td>
                {{ number_format($body['data']['simpanan_pokok']['penarikan'], 0, ',', '.') }}
            </td>
            <td>
                {{ number_format($body['data']['simpanan_pokok']['penyetoran'] + $body['data']['simpanan_pokok']['penarikan'], 0, ',', '.') }}
            </td>
        </tr>
        <tr>
            <td>
                {{ $body['data']['simpanan_sukarela']['jenis'] }}
            </td>
            <td>
                {{ $body['data']['simpanan_sukarela']['akun'] }}
            </td>
            <td>
                {{ number_format($body['data']['simpanan_sukarela']['penyetoran'], 0, ',', '.') }}
            </td>
            <td>
                {{ number_format($body['data']['simpanan_sukarela']['penarikan'], 0, ',', '.') }}
            </td>
            <td>
                {{ number_format($body['data']['simpanan_sukarela']['penyetoran'] + $body['data']['simpanan_sukarela']['penarikan'], 0, ',', '.') }}
            </td>
        </tr>
        <tr>
            <td>
                {{ $body['data']['simpanan_wajib']['jenis'] }}
            </td>
            <td>
                {{ $body['data']['simpanan_wajib']['akun'] }}
            </td>
            <td>
                {{ number_format($body['data']['simpanan_wajib']['penyetoran'], 0, ',', '.') }}
            </td>
            <td>
                {{ number_format($body['data']['simpanan_wajib']['penarikan'], 0, ',', '.') }}
            </td>
            <td>
                {{ number_format($body['data']['simpanan_wajib']['penyetoran'] + $body['data']['simpanan_wajib']['penarikan'], 0, ',', '.') }}
            </td>
        </tr>
    </tbody>
    <tfoot>
    <tr>
      <td colspan="2">Total</td>
      <td>
        {{ number_format($body['data']['simpanan_pokok']['penyetoran']+$body['data']['simpanan_sukarela']['penyetoran']+$body['data']['simpanan_wajib']['penyetoran'],0,',','.') }}
      </td>
      <td>
        {{ number_format($body['data']['simpanan_pokok']['penarikan']+$body['data']['simpanan_sukarela']['penarikan']+$body['data']['simpanan_wajib']['penarikan'],0,',','.') }}
      </td>
      <td>
        {{ number_format(($body['data']['simpanan_pokok']['penyetoran']+$body['data']['simpanan_sukarela']['penyetoran']+$body['data']['simpanan_wajib']['penyetoran'])-$body['data']['simpanan_pokok']['penarikan']+$body['data']['simpanan_sukarela']['penarikan']+$body['data']['simpanan_wajib']['penarikan'],0,',','.') }}
      </td>
    </tr>
  </tfoot>
</table>
