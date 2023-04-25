import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { MdEdit, MdOutlineKeyboardBackspace } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import baseUrl from "../../components/baseUrl";
import { NumberFormat } from "../../components/Input";
import axios from "../../components/axiosApi";
import useStore from "../../store/useStore";
import ToDate, { ToDate2 } from "../../components/Date";
import CapitalFirst from "../../components/CapitalFirstLetter";
import Pagination from "../../components/Datatable/Pagination/Pagination";

export default function LapRiwayat() {
  const dataLokal = JSON.parse(localStorage.getItem("dataRiwayatDetail"));
  const tokenLogin = useStore((state) => state.token);
  const [currentPage, setCurrentPage] = useState(1);
  const navigasi = useNavigate();

  const fetchDatas = async () => {
    let url = `${baseUrl}/angsuranprofil/${dataLokal.no_pinjaman}`;
    const { data: res } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${tokenLogin}`,
      },
    });
    return res.data;
  };

  const fetchSimulasi = async () => {
    let url = `${baseUrl}/simulasi?pinjaman=${dataLokal.no_pinjaman}`;
    const { data: res } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${tokenLogin}`,
      },
    });
    return res.data;
  };

  const fetchAngsurans = async () => {
    let url = `${baseUrl}/angsuransLap?pinjaman=${dataLokal.no_pinjaman}`;
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
    data: angsurans,
    error,
  } = useQuery({
    networkMode: `always`,
    queryKey: ["angsuran"],
    queryFn: fetchAngsurans,
  });

  const {
    isLoading: isLoadingProfile,
    isError: isErrorProfile,
    data: profiles,
    error: errorProfile,
  } = useQuery({
    networkMode: `always`,
    queryKey: ["profilRiwayatPinjaman"],
    queryFn: fetchDatas,
  });

  const {
    isLoading: isLoadingSimulasi,
    isError: isErrorSimulasi,
    data: simulasis,
    error: errorSimulasi,
  } = useQuery({
    networkMode: `always`,
    queryKey: ["Simulasi"],
    queryFn: fetchSimulasi,
  });

  if (isLoadingProfile) return "loading....";

  return (
    <>
      <div className="card bg-white">
        <div className="border-second card-header">
          <h3 className="mb-0 text-lg font-bold">Data Riwayat Pinjaman</h3>
          <div className="flex justify-center items-center">
            <Link
              to={`/pelaporan/lapriwayat`}
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
                    <td className="border-0">No Pinjaman</td>
                    <td className="border-0">:</td>
                    <td className="border-0">{dataLokal.no_pinjaman}</td>
                  </tr>
                  <tr>
                    <td className="border-0">Nama Nasabah</td>
                    <td className="border-0">:</td>
                    <td className="border-0 sm:w-8/12">
                      {CapitalFirst(dataLokal.nama_nasabah)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mb-2 sm:mb-0 sm:w-4/12">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="border-0">Tanggal Pinjaman</td>
                    <td className="border-0">:</td>
                    <td className="border-0">
                      {ToDate(dataLokal.tanggal_pinjaman)}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-0">Tanggal Jatuh Tempo</td>
                    <td className="border-0">:</td>
                    <td className="border-0">{dataLokal.jatuh_tempo}</td>
                  </tr>
                  <tr>
                    <td className="border-0">Jangka Waktu</td>
                    <td className="border-0">:</td>
                    <td className="border-0">{dataLokal.jangka_waktu} Bulan</td>
                  </tr>
                  <tr>
                    <td className="border-0">Suku Bunga/Tahun</td>
                    <td className="border-0">:</td>
                    <td className="border-0">{dataLokal.suku_bunga} %</td>
                  </tr>
                  <tr>
                    <td className="border-0">Sisa Pinjaman</td>
                    <td className="border-0">:</td>
                    <td className="border-0">
                      <NumberFormat value={profiles.sisa_pinjaman} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mb-2 sm:mb-0 sm:w-3/12">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="border-0">Jumlah Pinjaman</td>
                    <td className="border-0">:</td>
                    <td className="border-0">
                      <NumberFormat value={dataLokal.bakidebet} />
                    </td>
                  </tr>
                  <tr>
                    <td className="border-0">Angsuran Pokok</td>
                    <td className="border-0">:</td>
                    <td className="border-0">
                      <NumberFormat value={dataLokal.pokok} />
                    </td>
                  </tr>
                  <tr>
                    <td className="border-0">Angsuran Bunga</td>
                    <td className="border-0">:</td>
                    <td className="border-0">
                      <NumberFormat value={dataLokal.bunga} />
                    </td>
                  </tr>
                  <tr>
                    <td className="border-0">Tunggakan Pokok</td>
                    <td className="border-0">:</td>
                    <td className="border-0">
                      <NumberFormat value={profiles.tunggakan_pokok} />
                    </td>
                  </tr>
                  <tr>
                    <td className="border-0">Tunggakan Bunga</td>
                    <td className="border-0">:</td>
                    <td className="border-0">
                      <NumberFormat value={profiles.tunggakan_bunga} />
                    </td>
                  </tr>
                  <tr>
                    <td className="border-0">Denda</td>
                    <td className="border-0">:</td>
                    <td className="border-0">
                      <NumberFormat
                        value={
                          parseInt(profiles.kena_denda) === 1
                            ? dataLokal.denda
                            : 0
                        }
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h1 className="text-lg font-semibold">Simulasi Pinjaman</h1>

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
                        Bulan Ke
                      </th>
                      <th
                        scope="col"
                        className="border-r border-third px-6 py-4"
                      >
                        Tanggal Jatuh Tempo
                      </th>
                      <th
                        scope="col"
                        className="border-r border-third px-6 py-4"
                      >
                        Bayar Pokok
                      </th>
                      <th
                        scope="col"
                        className="border-r border-third px-6 py-4"
                      >
                        Bayar Bunga
                      </th>
                      <th
                        scope="col"
                        className="border-r border-third px-6 py-4"
                      >
                        Total Tagihan Pokok + Bunga
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoadingSimulasi && (
                      <tr>
                        <td colSpan={5} className="text-left">
                          Loading....
                        </td>
                      </tr>
                    )}
                    {simulasis?.length > 0
                      ? simulasis?.map((data, index) => (
                          <tr
                            className="border-b font-medium even:bg-white odd:bg-slate-100"
                            key={index}
                          >
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-left">
                              {data.bulan}
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-left">
                              {ToDate2(data.jatuh_tempo)}
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-right">
                              <NumberFormat value={data.pokok} />
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-right">
                              <NumberFormat value={data.bunga} />
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-right">
                              <NumberFormat value={data.total} />
                            </td>
                          </tr>
                        ))
                      : !isLoadingSimulasi && (
                          <tr>
                            <td colSpan={5} className="text-center">
                              Tidak Ada Data
                            </td>
                          </tr>
                        )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <h1 className="text-lg font-semibold">Detail Transaksi Pinjaman</h1>

          <div className="flex flex-col overflow-x-auto">
            <div className="sm:-mx-6 lg:-mx-8 xl:-mx-0">
              <div className="min-w-full py-2 sm:px-6 lg:px-8 xl:px-0">
                <table className="min-w-full border-2 border-third text-center text-base font-light">
                  <thead className="border-b border-third font-medium whitespace-nowrap">
                    <tr className="bg-four">
                      <th
                        scope="col"
                        className="border-r border-third px-6 py-4"
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
                        Pembayaran Ke
                      </th>
                      <th
                        scope="col"
                        className="border-r border-third px-6 py-4"
                      >
                        Bayar Pokok
                      </th>
                      <th
                        scope="col"
                        className="border-r border-third px-6 py-4"
                      >
                        Bayar Bunga
                      </th>
                      <th
                        scope="col"
                        className="border-r border-third px-6 py-4"
                      >
                        Bayar Denda
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading && (
                      <tr>
                        <td colSpan={5} className="text-left">
                          Loading....
                        </td>
                      </tr>
                    )}
                    {angsurans?.length > 0
                      ? angsurans?.map((data, index) => {
                          return (
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
                              <td className="whitespace-nowrap border-r border-third px-6 py-2 text-left">
                                {data.pembayaran_ke}
                              </td>
                              <td className="whitespace-nowrap border-r border-third px-6 py-2 text-right">
                                <NumberFormat value={data.pokok_bayar} />
                              </td>
                              <td className="whitespace-nowrap border-r border-third px-6 py-2 text-right">
                                <NumberFormat value={data.bunga_bayar} />
                              </td>
                              <td className="whitespace-nowrap border-r border-third px-6 py-2 text-right">
                                <NumberFormat value={data.denda_bayar} />
                              </td>
                            </tr>
                          );
                        })
                      : !isLoading && (
                          <tr>
                            <td colSpan={5} className="text-center">
                              Tidak Ada Data
                            </td>
                          </tr>
                        )}
                  </tbody>
                  <tfoot>
                    <tr className="font-medium even:bg-white odd:bg-slate-100">
                      <td
                        colSpan={3}
                        className="whitespace-nowrap border-r border-t-2 border-third px-6 py-2 text-center"
                      >
                        Total
                      </td>
                      <td className="whitespace-nowrap border-r border-t-2 border-third px-6 py-2 text-right">
                        <NumberFormat
                          value={
                            angsurans?.length > 0
                              ? angsurans.reduce((total, item) => {
                                  return total + item.pokok_bayar;
                                }, 0)
                              : 0
                          }
                        />
                      </td>
                      <td className="whitespace-nowrap border-r border-t-2 border-third px-6 py-2 text-right">
                      <NumberFormat
                          value={
                            angsurans?.length > 0
                              ? angsurans.reduce((total, item) => {
                                  return total + item.bunga_bayar;
                                }, 0)
                              : 0
                          }
                        />
                      </td>
                      <td className="whitespace-nowrap border-r border-t-2 border-third px-6 py-2 text-right">
                      <NumberFormat
                          value={
                            angsurans?.length > 0
                              ? angsurans.reduce((total, item) => {
                                  return total + item.denda_bayar;
                                }, 0)
                              : 0
                          }
                        />
                      </td>
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
