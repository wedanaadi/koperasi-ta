import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../components/baseUrl";
import Search from "../../components/Datatable/Search";
import { DateInput, NumberFormat } from "../../components/Input";
import Select from "../../components/Tailwind/Select";
import useStore from "../../store/useStore";
import axios from "../../components/axiosApi";
import ToDate, { ConvertToEpoch, ToDate2 } from "../../components/Date";
import Pagination from "../../components/Datatable/Pagination/Pagination";
import { MdPrint } from "react-icons/md";

export default function LapTrx() {
  const [currentPage, setCurrentPage] = useState(1);
  const [onSearch, setSearch] = useState("");
  const tokenLogin = useStore((state) => state.token);
  const dataSetting = useStore((state) => state.dataSetting);
  const toastChange = useStore((state) => state.changeState);
  const toastIcon = useStore((state) => state.iconsToast);
  const toastColors = useStore((state) => state.colorsToast);
  const [pagination, setPagination] = useState({
    label: "10",
    value: 10,
  });
  const [dateTrx, setdateTrx] = useState({
    startDate: new Date().toDateString(),
    endDate: new Date().toDateString(),
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [idSelected, setIDSelected] = useState("");
  const optionsPage = [
    {
      value: 10,
      label: "10",
    },
    {
      value: 25,
      label: "25",
    },
    {
      value: 50,
      label: "50",
    },
    {
      value: 100,
      label: "100",
    },
  ];
  const navigasi = useNavigate();
  const queryClient = useQueryClient();

  const fetchDatas = async () => {
    let url = `${baseUrl}/laptrxkas?page=${currentPage}&perpage=${
      pagination.value
    }&periode=${ConvertToEpoch(dateTrx.startDate)},${ConvertToEpoch(
      dateTrx.endDate
    )}`;
    if (onSearch) {
      setCurrentPage(1);
      url += `&search=${onSearch}`;
    }
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
    data: laporans,
    error,
    refetch,
  } = useQuery({
    networkMode: `always`,
    queryKey: ["lapKas",currentPage,pagination, dateTrx],
    queryFn: fetchDatas,
  });

  const handleCetak = () => {
    window.open(
      `${import.meta.env.VITE_BACKEND_PUBLIC}/kas/trxkas?lokasi=${
        dataSetting?.lokasi ? dataSetting.lokasi : "Bali"
      }&alamat=${
        dataSetting?.alamat ? btoa(dataSetting.alamat) : "-"
      }&direktur=${
        dataSetting?.direktur ? btoa(dataSetting.direktur) : "-"
      }&teller=${dataSetting?.teller ? btoa(dataSetting.teller) : "-"}&periode=${ConvertToEpoch(dateTrx.startDate)},${ConvertToEpoch(
        dateTrx.endDate
      )}`,
      "_blank"
    );
  };

  return (
    <>
      <div className="card bg-white">
        <div className="border-second card-header">
          <h3 className="mb-0 text-lg font-bold">Laporan Transaksi Kas</h3>
          <button
            className="btn2 bg-primary hover:opacity-80 flex items-center"
            onClick={() => {
              handleCetak();
            }}
          >
            <MdPrint /> &nbsp;
            <span>Cetak</span>
          </button>
        </div>
        <div className="card-body">
          <div className="sm:flex sm:flex-row sm:items-center gap-x-4">
            <div className="w-full sm:w-2/12">
              <Select
                placeHolder="Page..."
                options={optionsPage}
                cssPotision="absolute"
                editValue={pagination}
                onChange={(value) => {
                  setPagination(value);
                }}
              />
            </div>
            <div className="w-4/12 pt-2">
              <DateInput
                marginBottom="mb-0"
                asSingle={false}
                hiddenLabel={true}
                hiddenvalidasi={true}
                value={dateTrx}
                label="Periode"
                handle={(value) => setdateTrx(value)}
                validasi={{}}
              />
            </div>
            <div className="flex mt-2 sm:mt-0 justify-between sm:justify-normal sm:flex-row-reverse w-full">
              <>
                <button
                  className="btn2 bg-blue-700 hover:opacity-80"
                  onClick={() => refetch()}
                >
                  Cari
                </button>
                &nbsp;
                <Search
                  onSearch={(value) => {
                    setSearch(value);
                  }}
                />
              </>
            </div>
          </div>

          <div className="flex flex-col overflow-x-auto mt-2">
            <div className="sm:-mx-6 lg:-mx-8 xl:-mx-0">
              <div className="min-w-full py-2 sm:px-6 lg:px-8 xl:px-0">
                <table className="min-w-full border-2 border-third text-center text-base font-light">
                  <thead className="border-b border-third font-medium whitespace-nowrap">
                    <tr className="bg-four">
                      <th
                        scope="col"
                        className="border-r border-third px-6 py-4 w-1/12"
                      >
                        #
                      </th>
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
                        Jenis Transaksi
                      </th>
                      <th
                        scope="col"
                        className="border-r border-third px-6 py-4"
                      >
                        Keterangan
                      </th>
                      <th
                        scope="col"
                        className="border-r border-third px-6 py-4"
                      >
                        Dari Akun
                      </th>
                      <th
                        scope="col"
                        className="border-r border-third px-6 py-4"
                      >
                        Untuk Akun
                      </th>
                      <th
                        scope="col"
                        className="border-r border-third px-6 py-4"
                      >
                        Jumlah
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b font-medium even:bg-white odd:bg-slate-100">
                      <td colSpan={7} className="whitespace-nowrap border-r border-b border-third px-6 py-2 text-right">Sebelumnya</td>
                      <td className="whitespace-nowrap border-r border-b border-third px-6 py-2 text-right">
                      <NumberFormat value={laporans?.prev} />
                      </td>
                    </tr>
                    {isLoading && (
                      <tr>
                        <td colSpan={8} className="text-left">
                          Loading....
                        </td>
                      </tr>
                    )}
                    {laporans?.lap.data.length > 0
                      ? laporans?.lap.data.map((data, index) => (
                          <tr
                            className="border-b font-medium even:bg-white odd:bg-slate-100"
                            key={index}
                          >
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 font-medium">
                              {index + laporans.lap.from}
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-left">
                              {data.kode_transaksi}
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-left">
                              {ToDate(data.tanggal_transaksi)}
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-left">
                              {data.jenis_transaksi}
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-left">
                              {data.keterangan}
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-left">
                              {data.dari_akun.jenis_transaksi}
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-left">
                              {data.untuk_akun.jenis_transaksi}
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-right">
                              <NumberFormat value={data.jumlah} />
                            </td>
                          </tr>
                        ))
                      : !isLoading && (
                          <tr>
                            <td colSpan={8} className="text-center">
                              Tidak Ada Data
                            </td>
                          </tr>
                        )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {laporans ? (
            <Pagination
              className="pagination-bar float-right mb-3"
              currentPage={currentPage}
              totalCount={laporans.lap.total}
              pageSize={laporans.lap.per_page}
              onPageChange={(page) => setCurrentPage(page)}
            />
          ) : (
            false
          )}
        </div>
      </div>
    </>
  )
}
