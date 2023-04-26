{!! $header !!}
<title>Bukti Transaksi</title>

<p style="font-size: 1.125rem; line-height:1.75rem; font-weight: 600; margin-top: 20px;;">
    {{ $setting['judul'] }}
</p>

<div
    style="border: 2px solid #000; display: flex; justify-content: space-between; padding: 4px; column-gap: 0.5rem">
    {{-- {!! dd($body['data'][0]['id_nasabah']) !!} --}}
    <table border="0" style="width: 100%">
        <tbody>
            <tr>
                <td className="border-0">ID Nasabah</td>
                <td className="border-0">:</td>
                <td className="border-0">{{ $body['data'][0]['id_nasabah'] }}</td>
                <td></td>
                <td className="border-0">Total Simpanan Sukarela</td>
                <td className="border-0">:</td>
                <td className="border-0 sm:w-6/12">
                    {{ number_format($body['data'][0]['Simpanan_Sukarela'], 0, ',', '.') }}
                </td>
            </tr>
            <tr>
                <td className="border-0">Nama Lengkap</td>
                <td className="border-0">:</td>
                <td className="border-0">{{ $body['data'][0]['nama'] }}</td>
                <td></td>
                <td className="border-0">Total Simpanan Wajib</td>
                <td className="border-0">:</td>
                <td className="border-0">
                    {{ number_format($body['data'][0]['Simpanan_Wajib'], 0, ',', '.') }}
                </td>
            </tr>
            <tr>
                <td className="border-0">Tanggal Buka</td>
                <td className="border-0">:</td>
                <td className="border-0">{{ $body['data'][0]['tanggal_buka'] }}</td>
                <td></td>
                <td className="border-0">Total Simpanan Pokok</td>
                <td className="border-0">:</td>
                <td className="border-0">
                    {{ number_format($body['data'][0]['Simpanan_Pokok'], 0, ',', '.') }}
                </td>
            </tr>
            <tr>
                <td className="border-0"></td>
                <td className="border-0"></td>
                <td className="border-0"></td>
                <td></td>
                <td className="border-0">Total Simpanan</td>
                <td className="border-0">:</td>
                <td className="border-0">
                    {{ number_format($body['data'][0]['Simpanan_Sukarela'] + $body['data'][0]['Simpanan_Pokok'] + $body['data'][0]['Simpanan_Wajib'], 0, ',', '.') }}
                </td>
            </tr>
        </tbody>
    </table>
</div>

<p style="font-size: 1.125rem; line-height:1.75rem; font-weight: 600; margin-top: 20px;">
    Rekening Koran
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
                Debet
            </th>
            <th>
                Kredit
            </th>
            <th>
                Jumlah
            </th>
            <th>
                Jenis Simpanan
            </th>
            <th>
                Keterangan
            </th>
        </tr>
    </thead>
    <tbody>
      @php
          $debet = 0;
          $kredit = 0;
          $jumlah = 0;
      @endphp
      @foreach ($body['rekening'] as $rek)
      <tr>
        <td>
            {{ $rek['kode_transaksi'] }}
        </td>
        <td>
            {{ $rek['tanggal_transaksi'] }}
        </td>
        <td>
        {{ number_format($rek['debet'],0,',','.') }}
        </td>
        <td>
          {{ number_format($rek['kredit'],0,',','.') }}
        </td>
        <td>
          {{ number_format($rek['jumlah'],0,',','.') }}
        </td>
        <td>
          {{ $rek['jenis'] }}
        </td>
        <td>
          {{ $rek['keterangan'] }}
        </td>
    </tr>
      @php
          $debet+=$rek['debet'];
          $kredit+=$rek['kredit'];
          $jumlah+=$rek['jumlah'];
      @endphp
      @endforeach
    </tbody>
    <tfoot>
      <tr>
        <td colspan="2">Total</td>
        <td>
          {{ number_format($debet,0,',','.') }}
        </td>
        <td>
          {{ number_format($kredit,0,',','.') }}
        </td>
        <td>
          {{ number_format($jumlah,0,',','.') }}
        </td>
        <td></td>
        <td></td>
      </tr>
    </tfoot>
</table>
