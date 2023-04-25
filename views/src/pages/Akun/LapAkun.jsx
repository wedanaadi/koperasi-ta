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

export default function LapAkun() {
  const [currentPage, setCurrentPage] = useState(1);
  const [onSearch, setSearch] = useState("");
  const tokenLogin = useStore((state) => state.token);
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
    let url = `${baseUrl}/neraca?periode=${ConvertToEpoch(dateTrx.startDate)},${ConvertToEpoch(
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
    queryKey: ["Neraca", dateTrx],
    queryFn: fetchDatas,
  });
  return (
    <>
    <div className="card bg-white">
      <div className="border-second card-header">
        <h3 className="mb-0 text-lg font-bold">Laporan Neraca</h3>
      </div>
      <div className="card-body">
        <div className="sm:flex sm:flex-row sm:items-center gap-x-4">
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
        </div>

        <div className="flex flex-col overflow-x-auto mt-2">
          <div className="sm:-mx-6 lg:-mx-8 xl:-mx-0">
            <div className="min-w-full py-2 sm:px-6 lg:px-8 xl:px-0">
              <table className="min-w-full border-2 border-third text-center text-base font-light">
                <thead className="border-b border-third font-medium whitespace-nowrap">
                  <tr className="bg-four">
                    <th
                      scope="col"
                      className="border-r border-third px-6 py-4"
                    >
                      Kode Akun
                    </th>
                    <th
                      scope="col"
                      className="border-r border-third px-6 py-4"
                    >
                      Nama Akun
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
                  </tr>
                </thead>
                <tbody>
                  {isLoading && (
                    <tr>
                      <td colSpan={4} className="text-left">
                        Loading....
                      </td>
                    </tr>
                  )}
                  {laporans?.length > 0
                    ? laporans.map((data, index) => (
                        <tr
                          className="border-b font-medium even:bg-white odd:bg-slate-100"
                          key={index}
                        >
                          <td className="whitespace-nowrap border-r border-third px-6 py-2 text-left">
                            {data.no_akun}
                          </td>
                          <td className="whitespace-nowrap border-r border-third px-6 py-2 text-left">
                            {data.jenis}
                          </td>
                          <td className="whitespace-nowrap border-r border-third px-6 py-2 text-right">
                            <NumberFormat value={data.debet} />
                          </td>
                          <td className="whitespace-nowrap border-r border-third px-6 py-2 text-right">
                            <NumberFormat value={data.kredit} />
                          </td>
                        </tr>
                      ))
                    : !isLoading && (
                        <tr>
                          <td colSpan={4} className="text-center">
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
                        <NumberFormat
                          value={laporans?.reduce((total, item) => {
                            return total + item.debet;
                          }, 0)}
                        />
                      </td>
                      <td className="whitespace-nowrap border-r border-t-2 border-third px-6 py-2 text-right">
                      <NumberFormat
                          value={laporans?.reduce((total, item) => {
                            return total + item.kredit;
                          }, 0)}
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
  )
}
