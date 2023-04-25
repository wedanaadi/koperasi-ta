import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { Suspense, useEffect, useState } from "react";
import { MdAddCircleOutline, MdDeleteOutline, MdEdit } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Search from "../../components/Datatable/Search";
import Select from "../../components/Tailwind/Select";
import useStore from "../../store/useStore";
const ConfirmDialog = React.lazy(() => import("../../components/ConfirmAlert"));
import axios from "../../components/axiosApi";
import baseUrl from "../../components/baseUrl";
import ToDate from "../../components/Date";
import { NumberFormat } from "../../components/Input";
import { deleteData } from "../../api/Pinjaman";
import Pagination from "../../components/Datatable/Pagination/Pagination";
import { getRincian } from "../../api/Angsuran";
const Rincian = React.lazy(() => import("./Rincian"));

export default function View() {
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
  const [openRincian, setOpenRincian] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [dataPropsRincian, setDataPropsRincian] = useState([]);
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
    let url = `${baseUrl}/pinjaman?page=${currentPage}&perpage=${pagination.value}`;
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
    data: pinjamans,
    error,
    refetch,
  } = useQuery({
    networkMode: `always`,
    queryKey: ["pinjaman", currentPage, pagination],
    queryFn: fetchDatas,
  });

  const deleteMutation = useMutation({
    networkMode: `always`,
    mutationFn: deleteData,
    onSuccess: () => {
      setCurrentPage(1);
      queryClient.invalidateQueries({ queryKey: ["pinjaman"] });
      toastChange({
        id: "NotifPinjaman",
        content: {
          title: "Delete Data",
          description: "Delete data Pinjaman Successfuly",
          backgroundColor: toastColors.success,
          icon: toastIcon.check,
        },
        position: "top-right",
        dismiss: true,
        duration: 3000,
      });
    },
    onMutate: () => {
      toastChange({
        id: "NotifPinjaman",
        content: {
          title: "Delete Data",
          description: "Loading....",
          backgroundColor: toastColors.loading,
          icon: toastIcon.loading,
        },
        position: "top-right",
        dismiss: false,
        duration: 0,
      });
    },
    onError: (res) => {
      const respon = res.response;
      let message = "";
      if (respon.status === 422) {
        setErrorValidasi(respon.data.errors);
        message = respon.data.msg;
      } else if (respon.status === 403) {
        message = respon.data.errors;
      } else {
        message = respon.statusText;
      }
      toastChange({
        id: "NotifPinjaman",
        content: {
          title: "Delete Data",
          description: message,
          backgroundColor: toastColors.error,
          icon: toastIcon.error,
        },
        position: "top-right",
        dismiss: true,
        duration: 7000,
      });
    },
  });

  const rincianMutation = useMutation({
    networkMode: `always`,
    mutationFn: getRincian,
    onSuccess: (res) => {
      setDataPropsRincian(res.data);
      setOpenRincian(!openRincian);
    },
    onError: (res) => {
      const respon = res.response;
      let message = "";
      if (respon.status === 422) {
        setErrorValidasi(respon.data.errors);
        message = respon.data.msg;
      } else if (respon.status === 403) {
        message = respon.data.errors;
      } else {
        message = respon.statusText;
      }
      toastChange({
        id: "NotifRincian",
        content: {
          title: "Rincian",
          description: message,
          backgroundColor: toastColors.error,
          icon: toastIcon.error,
        },
        position: "top-right",
        dismiss: true,
        duration: 7000,
      });
    },
  });

  const handleEditButton = (data) => {
    localStorage.setItem("dataEdit", JSON.stringify(data));
    navigasi("edit", { replace: true });
  };

  const handleHapus = (id) => {
    if (confirmDelete) {
      deleteMutation.mutate({ id: id, token: tokenLogin });
      setConfirmDelete(false);
      setOpenDialog(false);
    }
  };

  useEffect(() => {
    handleHapus(idSelected);
  }, [confirmDelete]);

  const handleRincian = (noPinjaman) => {
    rincianMutation.mutate({
      id: noPinjaman,
      token: tokenLogin,
    });
  };

  if (isError) return `Error ${error.message}`;

  return (
    <>
      <Suspense>
        <ConfirmDialog
          settingDialog={{ openDialog, setOpenDialog }}
          actionConfirm={{ confirmDelete, setConfirmDelete }}
        />
        <Rincian
          settingDialog={{ openRincian, setOpenRincian }}
          dataProps={dataPropsRincian}
        />
      </Suspense>
      <div className="card bg-white">
        <div className="border-second card-header">
          <h3 className="mb-0 text-lg font-bold">Data Pinjaman</h3>
          <div className="flex justify-center items-center">
            <Link
              to={"add"}
              className="flex items-center btn bg-green-700 hover:opacity-80"
            >
              <MdAddCircleOutline /> &nbsp;
              <span>Tambah</span>
            </Link>
          </div>
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
                      <th
                        scope="col"
                        className="border-r border-third px-6 py-4"
                      >
                        Nomor Pinjaman
                      </th>
                      <th
                        scope="col"
                        className="border-r border-third px-6 py-4"
                      >
                        Tanggal Pinjaman
                      </th>
                      <th
                        scope="col"
                        className="border-r border-third px-6 py-4"
                      >
                        Nama Nasabah
                      </th>
                      <th
                        scope="col"
                        className="border-r border-third px-6 py-4"
                      >
                        Hitungan
                      </th>
                      <th
                        scope="col"
                        className="border-r border-third px-6 py-4"
                      >
                        Total Tagihan
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
                    {pinjamans?.data.length > 0
                      ? pinjamans?.data.map((data, index) => (
                          <tr
                            className="border-b font-medium even:bg-white odd:bg-slate-100"
                            key={index}
                          >
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 font-medium">
                              {index + pinjamans.from}
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
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-left">
                              <div className="flex flex-col text-sm">
                                <span>
                                  Jumlah Pinjaman Awal:{" "}
                                  <NumberFormat value={data.jumlah_pinjaman} />
                                </span>
                                <span>
                                  Jangka Waktu:{" "}
                                  {data.jangka_waktu.lama_angsuran} Bulan
                                </span>
                                <span>
                                  Tagihan Pokok Perbulan:{" "}
                                  <NumberFormat
                                    value={Math.round(
                                      parseFloat(data.jumlah_pinjaman) /
                                        data.jangka_waktu.lama_angsuran
                                    )}
                                  />
                                </span>
                                <span>
                                  Tagihan Bunga Perbulan:{" "}
                                  <NumberFormat
                                    value={
                                      parseFloat(data.jumlah_pinjaman) *
                                      (parseFloat(data.suku_bunga) / 100 / 12)
                                    }
                                  />
                                </span>
                                <span>Suku Bunga: {data.suku_bunga} %</span>
                              </div>
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-left">
                              <div className="flex flex-col items-start">
                                <span>
                                  Total Tagihan Perbulan:{" "}
                                  <NumberFormat
                                    value={
                                      Math.round(
                                        parseFloat(data.jumlah_pinjaman) /
                                          data.jangka_waktu.lama_angsuran
                                      ) +
                                      parseFloat(data.jumlah_pinjaman) *
                                        (parseFloat(data.suku_bunga) / 100 / 12)
                                    }
                                  />
                                </span>
                                {/* <Link to={``} className="underline text-sm">Lihat Rincian Tagihan</Link> */}
                                <span
                                  onClick={() =>
                                    handleRincian(data.no_pinjaman)
                                  }
                                  className="underline text-sm cursor-pointer"
                                >
                                  Lihat Rincian Tagihan
                                </span>
                              </div>
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2">
                              {parseInt(data.status) === 0 ? (
                                <div className="flex items-center">
                                  <button
                                    className="btn2 bg-orange-500 hover:opacity-80 flex items-center"
                                    onClick={() => handleEditButton(data)}
                                  >
                                    <MdEdit /> &nbsp;
                                    <span>Edit</span>
                                  </button>
                                  &nbsp;
                                  <button
                                    className="btn2 bg-red-700 hover:opacity-80 flex items-center"
                                    onClick={() => {
                                      setOpenDialog(!openDialog);
                                      setIDSelected(data.id);
                                    }}
                                  >
                                    <MdDeleteOutline /> &nbsp;
                                    <span>Hapus</span>
                                  </button>
                                </div>
                              ) : (
                                <span>Pinjaman Lunas</span>
                              )}
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
          {pinjamans ? (
            <Pagination
              className="pagination-bar float-right mb-3"
              currentPage={currentPage}
              totalCount={pinjamans.total}
              pageSize={pinjamans.per_page}
              onPageChange={(page) => setCurrentPage(page)}
            />
          ) : (
            false
          )}
        </div>
      </div>
    </>
  );
}
