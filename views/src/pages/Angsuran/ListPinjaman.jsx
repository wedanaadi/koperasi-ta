import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { MdAddCircleOutline, MdPayment } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import baseUrl from "../../components/baseUrl";
import Search from "../../components/Datatable/Search";
import Select from "../../components/Tailwind/Select";
import useStore from "../../store/useStore";
import axios from "../../components/axiosApi";
import Pagination from "../../components/Datatable/Pagination/Pagination";
import { NumberFormat } from "../../components/Input";
import ToDate from "../../components/Date";

export default function ListPinjaman() {
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
    let url = `${baseUrl}/angsuranpinjaman?page=${currentPage}&perpage=${pagination.value}`;
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
    data: listPinjamans,
    error,
    refetch,
  } = useQuery({
    networkMode: `always`,
    queryKey: ["listPinjaman", currentPage, pagination],
    queryFn: fetchDatas,
  });

  const handleAngsuran = (data) => {
    localStorage.setItem("dataPinjamanAngsuran", JSON.stringify(data));
    navigasi("bayar", { replace: true });
  };

  if (isError) return `Error ${error.message}`;

  return (
    <div className="card bg-white">
      <div className="border-second card-header">
        <h3 className="mb-0 text-lg font-bold">Data Angsuran Pinjaman</h3>
      </div>
      <div className="card-body">
        <div className="sm:flex sm:flex-row sm:items-center">
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
                      #
                    </th>
                    <th scope="col" className="border-r border-third px-6 py-4">
                      Nomor Pinjaman
                    </th>
                    <th scope="col" className="border-r border-third px-6 py-4">
                      Tanggal Pinjaman
                    </th>
                    <th scope="col" className="border-r border-third px-6 py-4">
                      Nama Nasabah
                    </th>
                    <th scope="col" className="border-r border-third px-6 py-4">
                      Bakidebet
                    </th>
                    <th scope="col" className="border-r border-third px-6 py-4">
                      Total Pokok
                    </th>
                    <th scope="col" className="border-r border-third px-6 py-4">
                      Total Bunga
                    </th>
                    <th
                      scope="col"
                      className="border-r border-third px-6 py-4 w-2/12"
                    >
                      Aksi
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
                    {listPinjamans?.data.length > 0
                      ? listPinjamans?.data.map((data, index) => (
                          <tr
                            className="border-b font-medium even:bg-white odd:bg-slate-100"
                            key={index}
                          >
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 font-medium">
                              {index + listPinjamans.from}
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-left">
                              {data.no_pinjaman}
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-left">
                              {ToDate(data.tanggal_pinjaman)}
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-left">
                              {data.nama_nasabah}
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-right">
                              <NumberFormat value={data.bakidebet} />
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-right">
                              <NumberFormat value={data.pokok} />
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-right">
                              <NumberFormat value={data.bunga} />
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2">
                              <div className="flex items-center">
                                <button
                                  className="btn2 bg-primary hover:opacity-80 flex items-center"
                                  onClick={() => handleAngsuran(data)}
                                >
                                  <MdPayment /> &nbsp;
                                  <span>Angsuran</span>
                                </button>
                              </div>
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
              </table>
            </div>
          </div>
        </div>
        {listPinjamans ? (
            <Pagination
              className="pagination-bar float-right mb-3"
              currentPage={currentPage}
              totalCount={listPinjamans.total}
              pageSize={listPinjamans.per_page}
              onPageChange={(page) => setCurrentPage(page)}
            />
          ) : (
            false
          )}
      </div>
    </div>
  );
}
