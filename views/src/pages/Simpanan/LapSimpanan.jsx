import React, { useState } from "react";
import { MdOutlineKeyboardBackspace, MdPrint } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { NumberFormat } from "../../components/Input";
import CapitalFirstLetter from "../../components/CapitalFirstLetter";
import { ToDate2 } from "../../components/Date";
import useStore from "../../store/useStore";
import { useQuery } from "@tanstack/react-query";
import baseUrl from "../../components/baseUrl";
import axios from "../../components/axiosApi";

export default function LapSimpanan() {
  const dataLokal = JSON.parse(localStorage.getItem("dataRekSimpanan"));
  const tokenLogin = useStore((state) => state.token);
  const dataSetting = useStore((state)=>state.dataSetting)
  const [currentPage, setCurrentPage] = useState(1);
  const navigasi = useNavigate();

  const fetchRekap = async () => {
    let url = `${baseUrl}/reksimpanan?nasabah=${dataLokal.id_nasabah}`;
    const { data: res } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${tokenLogin}`,
      },
    });
    return res.data;
  };

  const {
    isLoading,
    isError,
    data: rekapSimpanans,
    error,
  } = useQuery({
    networkMode: `always`,
    queryKey: ["rekapDetailSimpanan"],
    queryFn: fetchRekap,
  });

  const handleCetak = (id) => {
    window.open(`${import.meta.env.VITE_BACKEND_PUBLIC}/pinjaman/cetakreksimpanan?nasabah=${id}&lokasi=${dataSetting?.lokasi ? dataSetting.lokasi : 'Bali'}&alamat=${dataSetting?.alamat ? btoa(dataSetting.alamat) : '-'}`, '_blank');
  }

  const totalDebet =
    rekapSimpanans?.length > 0
      ? rekapSimpanans.reduce((total, item) => {
          return total + item.debet;
        }, 0)
      : 0;
  const totalKredit =
    rekapSimpanans?.length > 0
      ? rekapSimpanans.reduce((total, item) => {
          return total + item.kredit;
        }, 0)
      : 0;

  const totalSemua =
    totalDebet - totalKredit < 0
      ? `(${totalDebet - totalKredit})`
      : totalDebet - totalKredit;

  if (isError) return `Error ${error.message}`;
  return (
    <>
      <div className="card bg-white">
        <div className="border-second card-header">
          <h3 className="mb-0 text-lg font-bold">Data Simpanan</h3>
          <div className="flex justify-center items-center">
            <button
              className="btn2 bg-primary hover:opacity-80 flex items-center"
              onClick={() => {
                handleCetak(dataLokal.id_nasabah);
              }}
            >
              <MdPrint /> &nbsp;
              <span>Cetak</span>
            </button>
            &nbsp;
            <Link
              to={`/pelaporan/lapsimpanan`}
              className="btn bg-slate-600 text-white hover:opacity-80 flex items-center"
            >
              <MdOutlineKeyboardBackspace /> &nbsp;
              <span>Kembali</span>
            </Link>
          </div>
        </div>
        <div className="card-body">
          <div className="w-full border-2 border-third sm:flex sm:gap-x-2 sm:justify-between p-1">
            <div className="mb-2 sm:mb-0 sm:w-5/12">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="border-0">ID Nasabah</td>
                    <td className="border-0">:</td>
                    <td className="border-0">{dataLokal.id_nasabah}</td>
                  </tr>
                  <tr>
                    <td className="border-0">Nama Lengkap</td>
                    <td className="border-0">:</td>
                    <td className="border-0">
                      {CapitalFirstLetter(dataLokal.nama)}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-0">Tanggal Buka</td>
                    <td className="border-0">:</td>
                    <td className="border-0 sm:w-8/12">
                      {ToDate2(dataLokal.tanggal_buka)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mb-2 sm:mb-0 sm:w-5/12">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="border-0">Total Simpanan Sukarela</td>
                    <td className="border-0">:</td>
                    <td className="border-0 sm:w-6/12">
                      <NumberFormat value={dataLokal.Simpanan_Sukarela} />
                    </td>
                  </tr>
                  <tr>
                    <td className="border-0">Total Simpanan Wajib</td>
                    <td className="border-0">:</td>
                    <td className="border-0">
                      <NumberFormat value={dataLokal.Simpanan_Wajib} />
                    </td>
                  </tr>
                  <tr>
                    <td className="border-0">Total Simpanan Pokok</td>
                    <td className="border-0">:</td>
                    <td className="border-0">
                      <NumberFormat value={dataLokal.Simpanan_Pokok} />
                    </td>
                  </tr>
                  <tr>
                    <td className="border-0">Total Simpanan</td>
                    <td className="border-0">:</td>
                    <td className="border-0">
                      <NumberFormat
                        value={
                          dataLokal.Simpanan_Sukarela +
                          dataLokal.Simpanan_Wajib +
                          dataLokal.Simpanan_Pokok
                        }
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h1 className="text-lg font-semibold mt-2">Rekening Koran</h1>

          <div className="flex flex-col overflow-x-auto">
            <div className="sm:-mx-6 lg:-mx-8 xl:-mx-0">
              <div className="min-w-full py-2 sm:px-6 lg:px-8 xl:px-0">
                <table className="min-w-full border-2 border-third text-center text-base font-light">
                  <thead className="border-b border-third font-medium whitespace-nowrap">
                    <tr className="bg-four">
                      <th
                        scope="col"
                        className="border-r border-third px-6 py-4 w-1/12"
                      >
                        Kode Transaksi
                      </th>
                      <th
                        scope="col"
                        className="border-r border-third px-6 py-4"
                      >
                        Tanggal Transaksi
                      </th>
                      <th
                        scope="col"
                        className="border-r border-third px-6 py-4"
                      >
                        Debet
                      </th>
                      <th
                        scope="col"
                        className="border-r border-third px-6 py-4"
                      >
                        Kredit
                      </th>
                      <th
                        scope="col"
                        className="border-r border-third px-6 py-4"
                      >
                        Jumlah
                      </th>
                      <th
                        scope="col"
                        className="border-r border-third px-6 py-4"
                      >
                        Jenis Simpanan
                      </th>
                      <th
                        scope="col"
                        className="border-r border-third px-6 py-4"
                      >
                        Keterangan
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading && (
                      <tr>
                        <td colSpan={7} className="text-left">
                          Loading....
                        </td>
                      </tr>
                    )}
                    {rekapSimpanans?.length > 0
                      ? rekapSimpanans?.map((data, index) => (
                          <tr
                            className="border-b font-medium even:bg-white odd:bg-slate-100"
                            key={index}
                          >
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-left">
                              {data.kode_transaksi}
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-left">
                              {ToDate2(data.tanggal_transaksi)}
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-right">
                              <NumberFormat value={data.debet} />
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-right">
                              <NumberFormat value={data.kredit} />
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-right">
                              <NumberFormat value={data.jumlah} />
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-left">
                              {data.jenis}
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-left">
                              {data.keterangan}
                            </td>
                          </tr>
                        ))
                      : !isLoading && (
                          <tr>
                            <td colSpan={7} className="text-center">
                              Tidak Ada Data
                            </td>
                          </tr>
                        )}
                  </tbody>
                  <tfoot>
                    <tr className="font-medium even:bg-white odd:bg-slate-100">
                      <td
                        colSpan={2}
                        className="whitespace-nowrap border-r border-t-2 border-third px-6 py-2 text-center"
                      >
                        Total
                      </td>
                      <td className="whitespace-nowrap border-r border-t-2 border-third px-6 py-2 text-right">
                        <NumberFormat value={totalDebet} />
                      </td>
                      <td className="whitespace-nowrap border-r border-t-2 border-third px-6 py-2 text-right">
                        <NumberFormat value={totalKredit} />
                      </td>
                      <td className="whitespace-nowrap border-r border-t-2 border-third px-6 py-2 text-right">
                        <NumberFormat value={totalSemua} />
                      </td>
                      <td
                        colSpan={2}
                        className="whitespace-nowrap border-r border-t-2 border-third px-6 py-2 text-center"
                      ></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
