{!! $header !!}
<title>Bukti Transaksi</title>

<p style="font-size: 1.125rem; line-height:1.75rem; font-weight: 600; margin-top: 20px;;">
    {{ $setting['judul'] }}
</p>

<div style="border: 2px solid #000; display: flex; justify-content: space-between; padding: 4px; column-gap: 0.5rem">
    {{-- {!! dd($body['data'][0]['id_nasabah']) !!} --}}
    <table border="0" style="width: 100%">
        <tbody>
            <tr>
                <td className="border-0">ID Nasabah</td>
                <td className="border-0">:</td>
                <td className="border-0">{{ $body['data']['id_nasabah'] }}</td>
                <td></td>
                <td className="border-0">Tanggal Pinjaman</td>
                <td className="border-0">:</td>
                <td className="border-0">{{ $body['data']['tanggal_pinjaman'] }}</td>
                <td></td>
                <td className="border-0">Jumlah Pinjaman Pinjaman</td>
                <td className="border-0">:</td>
                <td className="border-0"> {{ number_format($body['data']['bakidebet'], 0, ',', '.') }}</td>
            </tr>
            <tr>
                <td className="border-0">No Pinjaman</td>
                <td className="border-0">:</td>
                <td className="border-0">{{ $body['data']['no_pinjaman'] }}</td>
                <td></td>
                <td className="border-0">Tanggal Jatuh Tempo</td>
                <td className="border-0">:</td>
                <td className="border-0">{{ $body['data']['jatuh_tempo'] }}</td>
                <td></td>
                <td className="border-0">Ansuran Pokok</td>
                <td className="border-0">:</td>
                <td className="border-0"> {{ number_format($body['data']['pokok'], 0, ',', '.') }}</td>
            </tr>
            <tr>
                <td className="border-0">Nama Nasabah</td>
                <td className="border-0">:</td>
                <td className="border-0">{{ $body['data']['nama_nasabah'] }}</td>
                <td></td>
                <td className="border-0">Jangka Waktu</td>
                <td className="border-0">:</td>
                <td className="border-0">{{ $body['data']['jangka_waktu'] }} Bulan</td>
                <td></td>
                <td className="border-0">Ansuran Bunga</td>
                <td className="border-0">:</td>
                <td className="border-0"> {{ number_format($body['data']['bunga'], 0, ',', '.') }}</td>
            </tr>
            <tr>
                <td className="border-0"></td>
                <td className="border-0"></td>
                <td className="border-0"></td>
                <td></td>
                <td className="border-0">Suku Bunga / Tahun</td>
                <td className="border-0">:</td>
                <td className="border-0">{{ $body['data']['suku_bunga'] }} %</td>
                <td></td>
                <td className="border-0">Tunggakan Pokok</td>
                <td className="border-0">:</td>
                <td className="border-0"> {{ number_format($body['profile']['tunggakan_pokok'], 0, ',', '.') }}</td>
            </tr>
            <tr>
                <td className="border-0"></td>
                <td className="border-0"></td>
                <td className="border-0"></td>
                <td></td>
                <td className="border-0">Sisa Pinjaman</td>
                <td className="border-0">:</td>
                <td className="border-0"> {{ number_format($body['profile']['sisa_pinjaman'], 0, ',', '.') }}</td>
                <td></td>
                <td className="border-0">Tunggakan Bunga</td>
                <td className="border-0">:</td>
                <td className="border-0"> {{ number_format($body['profile']['tunggakan_bunga'], 0, ',', '.') }}</td>
            </tr>
            <tr>
                <td className="border-0"></td>
                <td className="border-0"></td>
                <td className="border-0"></td>
                <td></td>
                <td className="border-0"></td>
                <td className="border-0"></td>
                <td className="border-0"></td>
                <td></td>
                <td className="border-0">Denda</td>
                <td className="border-0">:</td>
                <td className="border-0"> {!! $body['profile']['kena_denda'] == '1' ? number_format($body['profile']['denda'], 0, ',', '.') : 0 !!} </td>
            </tr>
        </tbody>
    </table>
</div>

<p style="font-size: 1.125rem; line-height:1.75rem; font-weight: 600; margin-top: 20px;">
    Simulasi Angsuran
</p>

<table style="width: 100%; margin-top: 30px; border-collapse: collapse; border:2px solid #000;" border="1">
    <thead>
        <tr>
            <th>
                Bulan
            </th>
            <th>
                Tanggal Jatuh Tempo
            </th>
            <th>
                Bayar Pokok
            </th>
            <th>
                Bayar Bunga
            </th>
            <th>
                Total Tagihan Pokok + Bunga
            </th>
        </tr>
    </thead>
    <tbody>
        @foreach ($body['simulasi'] as $rek)
            <tr>
                <td>
                    {{ $rek['bulan'] }}
                </td>
                <td>
                    {!! \Carbon\Carbon::parse($rek['jatuh_tempo'] / 1000)->format('d/m/Y') !!}
                </td>
                <td>
                    {{ number_format($rek['pokok'], 0, ',', '.') }}
                </td>
                <td>
                    {{ number_format($rek['bunga'], 0, ',', '.') }}
                </td>
                <td>
                    {{ number_format($rek['total'], 0, ',', '.') }}
                </td>
            </tr>
        @endforeach
    </tbody>
</table>

<p style="font-size: 1.125rem; line-height:1.75rem; font-weight: 600; margin-top: 20px;">
  Transaksi Angsuran
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
              Pembayaran Ke
          </th>
          <th>
              Bayar Pokok
          </th>
          <th>
              Bayar Bunga
          </th>
          <th>
              Bayar Denda
          </th>
      </tr>
  </thead>
  <tbody>
    @php
        $pokok =0;
        $bunga =0;
        $denda =0;
    @endphp
      @foreach ($body['angsuran'] as $rek)
          <tr>
              <td>
                  {{ $rek['kode_transaksi'] }}
              </td>
              <td>
                {!! \Carbon\Carbon::parse($rek['tanggal_transaksi'] / 1000)->format('d/m/Y') !!}
              </td>
              <td>
                  {{ $rek['pembayaran_ke'] }}
              </td>
              <td>
                  {{ number_format($rek['pokok_bayar'], 0, ',', '.') }}
              </td>
              <td>
                  {{ number_format($rek['bunga_bayar'], 0, ',', '.') }}
              </td>
              <td>
                  {{ number_format($rek['denda_bayar'], 0, ',', '.') }}
              </td>
          </tr>
          @php
          $pokok+=$rek['pokok'];
          $bunga+=$rek['bunga'];
          $denda+=$rek['denda'];
      @endphp
      @endforeach
  </tbody>
  <tfoot>
    <tr>
      <td colspan="3">Total</td>
      <td>
        {{ number_format($pokok,0,',','.') }}
      </td>
      <td>
        {{ number_format($bunga,0,',','.') }}
      </td>
      <td>
        {{ number_format($denda,0,',','.') }}
      </td>
    </tr>
  </tfoot>
</table>
