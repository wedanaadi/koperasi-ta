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

export default function KasSimpanan() {
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
    let url = `${baseUrl}/kassimpanan?page=${currentPage}&perpage=${
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
    data: lapKasSimpanans,
    error,
    refetch,
  } = useQuery({
    networkMode: `always`,
    queryKey: ["lapKasSimpanan", dateTrx],
    queryFn: fetchDatas,
  });

  return (
    <>
      <div className="card bg-white">
        <div className="border-second card-header">
          <h3 className="mb-0 text-lg font-bold">Laporan Kas Simpanan</h3>
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
                        Simpanan
                      </th>
                      <th
                        scope="col"
                        className="border-r border-third px-6 py-4"
                      >
                        Jenis Akun
                      </th>
                      <th
                        scope="col"
                        className="border-r border-third px-6 py-4"
                      >
                        Setoran
                      </th>
                      <th
                        scope="col"
                        className="border-r border-third px-6 py-4"
                      >
                        Penarikan
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
                    {isLoading && (
                      <tr>
                        <td colSpan={8} className="text-left">
                          Loading....
                        </td>
                      </tr>
                    )}
                    {lapKasSimpanans ? (
                      <>
                        <tr className="border-b font-medium even:bg-white odd:bg-slate-100">
                          <td className="whitespace-nowrap border-r border-third px-6 py-2 font-medium">
                            {1}
                          </td>
                          <td className="whitespace-nowrap border-r border-third px-6 py-2 font-medium">
                            {lapKasSimpanans?.simpanan_sukarela?.jenis}
                          </td>
                          <td className="whitespace-nowrap border-r border-third px-6 py-2 font-medium">
                            {lapKasSimpanans?.simpanan_sukarela?.akun}
                          </td>
                          <td className="whitespace-nowrap border-r border-third px-6 py-2 font-medium">
                            <NumberFormat
                              value={
                                lapKasSimpanans?.simpanan_sukarela?.penyetoran
                              }
                            />
                          </td>
                          <td className="whitespace-nowrap border-r border-third px-6 py-2 font-medium">
                            <NumberFormat
                              value={
                                lapKasSimpanans?.simpanan_sukarela?.penarikan
                              }
                            />
                          </td>
                          <td className="whitespace-nowrap border-r border-third px-6 py-2 font-medium">
                            <NumberFormat
                              value={
                                lapKasSimpanans?.simpanan_sukarela?.penyetoran -
                                lapKasSimpanans?.simpanan_sukarela?.penarikan
                              }
                            />
                          </td>
                        </tr>
                        <tr className="border-b font-medium even:bg-white odd:bg-slate-100">
                          <td className="whitespace-nowrap border-r border-third px-6 py-2 font-medium">
                            {2}
                          </td>
                          <td className="whitespace-nowrap border-r border-third px-6 py-2 font-medium">
                            {lapKasSimpanans?.simpanan_pokok?.jenis}
                          </td>
                          <td className="whitespace-nowrap border-r border-third px-6 py-2 font-medium">
                            {lapKasSimpanans?.simpanan_pokok?.akun}
                          </td>
                          <td className="whitespace-nowrap border-r border-third px-6 py-2 font-medium">
                            <NumberFormat
                              value={lapKasSimpanans?.simpanan_pokok?.penyetoran}
                            />
                          </td>
                          <td className="whitespace-nowrap border-r border-third px-6 py-2 font-medium">
                            <NumberFormat
                              value={lapKasSimpanans?.simpanan_pokok?.penarikan}
                            />
                          </td>
                          <td className="whitespace-nowrap border-r border-third px-6 py-2 font-medium">
                            <NumberFormat
                              value={
                                lapKasSimpanans?.simpanan_pokok?.penyetoran -
                                lapKasSimpanans?.simpanan_pokok?.penarikan
                              }
                            />
                          </td>
                        </tr>
                        <tr className="border-b font-medium even:bg-white odd:bg-slate-100">
                          <td className="whitespace-nowrap border-r border-third px-6 py-2 font-medium">
                            {3}
                          </td>
                          <td className="whitespace-nowrap border-r border-third px-6 py-2 font-medium">
                            {lapKasSimpanans?.simpanan_wajib?.jenis}
                          </td>
                          <td className="whitespace-nowrap border-r border-third px-6 py-2 font-medium">
                            {lapKasSimpanans?.simpanan_wajib?.akun}
                          </td>
                          <td className="whitespace-nowrap border-r border-third px-6 py-2 font-medium">
                            <NumberFormat
                              value={lapKasSimpanans?.simpanan_wajib?.penyetoran}
                            />
                          </td>
                          <td className="whitespace-nowrap border-r border-third px-6 py-2 font-medium">
                            <NumberFormat
                              value={lapKasSimpanans?.simpanan_wajib?.penarikan}
                            />
                          </td>
                          <td className="whitespace-nowrap border-r border-third px-6 py-2 font-medium">
                            <NumberFormat
                              value={
                                lapKasSimpanans?.simpanan_wajib?.penyetoran -
                                lapKasSimpanans?.simpanan_wajib?.penarikan
                              }
                            />
                          </td>
                        </tr>
                      </>
                    ) : (
                      !isLoading && (
                        <tr>
                          <td colSpan={6} className="text-center">
                            Tidak Ada Data
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                  <tfoot>
                    <tr className="font-medium even:bg-white odd:bg-slate-100">
                      <td colSpan={3} className="border-t-2 whitespace-nowrap border-r border-third px-6 py-2 font-medium">Total</td>
                      <td className="border-t-2 whitespace-nowrap border-r border-third px-6 py-2 font-medium">
                        <NumberFormat
                          value={
                            lapKasSimpanans?.simpanan_wajib?.penyetoran +
                            lapKasSimpanans?.simpanan_pokok?.penyetoran +
                            lapKasSimpanans?.simpanan_sukarela?.penyetoran
                          }
                        />
                      </td>
                      <td className="border-t-2 whitespace-nowrap border-r border-third px-6 py-2 font-medium">
                        <NumberFormat
                          value={
                            lapKasSimpanans?.simpanan_wajib?.penarikan +
                            lapKasSimpanans?.simpanan_pokok?.penarikan +
                            lapKasSimpanans?.simpanan_sukarela?.penarikan
                          }
                        />
                      </td>
                      <td className="border-t-2 whitespace-nowrap border-r border-third px-6 py-2 font-medium">
                        <NumberFormat
                          value={
                            lapKasSimpanans?.simpanan_wajib?.penyetoran +
                            lapKasSimpanans?.simpanan_pokok?.penyetoran +
                            lapKasSimpanans?.simpanan_sukarela?.penyetoran -
                            (lapKasSimpanans?.simpanan_wajib?.penarikan +
                              lapKasSimpanans?.simpanan_pokok?.penarikan +
                              lapKasSimpanans?.simpanan_sukarela?.penarikan)
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
