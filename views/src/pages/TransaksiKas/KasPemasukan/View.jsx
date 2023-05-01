import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../../../store/useStore";
import { deleteData } from "../../../api/Kas";
import Pagination from "../../../components/Datatable/Pagination/Pagination";
import { MdAddCircleOutline, MdEdit, MdDeleteOutline, MdPrint } from "react-icons/md";
import Select from "../../../components/Tailwind/Select";
import Search from "../../../components/Datatable/Search";
import baseUrl from "../../../components/baseUrl";
import axios from "../../../components/axiosApi";
import { NumberFormat } from "../../../components/Input";
import ToDate, { ToDate2 } from "../../../components/Date"

const ConfirmDialog = React.lazy(() => import("../../../components/ConfirmAlert"));

export default function View() {
  const [currentPage, setCurrentPage] = useState(1);
  const [onSearch, setSearch] = useState("");
  const tokenLogin = useStore((state) => state.token);
  const toastChange = useStore((state) => state.changeState);
  const toastIcon = useStore((state) => state.iconsToast);
  const toastColors = useStore((state) => state.colorsToast);
  const dataSetting = useStore((state)=>state.dataSetting)
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
    let url = `${baseUrl}/kas?page=${currentPage}&perpage=${pagination.value}&jenis=pemasukan`;
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
    data: pemasukans,
    error,
    refetch,
  } = useQuery({
    networkMode: `always`,
    queryKey: ["kasmasuk", currentPage, pagination],
    queryFn: fetchDatas,
  });

  const deleteKasMasukMutation = useMutation({
    networkMode: `always`,
    mutationFn: deleteData,
    onSuccess: () => {
      setCurrentPage(1);
      queryClient.invalidateQueries({ queryKey: ["kasmasuk"] });
      toastChange({
        id: "NotifKasMasuk",
        content: {
          title: "Delete Data",
          description: "Delete data KasMasuk Successfuly",
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
        id: "NotifKasMasuk",
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
        id: "NotifKasMasuk",
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

  const handleEditButton = (data) => {
    localStorage.setItem("dataEdit", JSON.stringify(data));
    navigasi("edit", { replace: true });
  };

  const handleHapus = (id) => {
    if (confirmDelete) {
      deleteKasMasukMutation.mutate({
        id: id,
        token: tokenLogin,
        tipe: "pemasukan",
      });
      setConfirmDelete(false);
      setOpenDialog(false);
    }
  };

  const handleCetak = (id) => {
    window.open(`${import.meta.env.VITE_BACKEND_PUBLIC}/kas/bukti?id=${id}&lokasi=${dataSetting?.lokasi ? dataSetting.lokasi : 'Bali'}&title=masuk&alamat=${dataSetting?.alamat ? btoa(dataSetting.alamat) : '-'}`, '_blank');
  }

  useEffect(() => {
    handleHapus(idSelected);
  }, [confirmDelete]);

  if (isError) return `Error ${error.message}`;

  return (
    <>
      <ConfirmDialog
        settingDialog={{ openDialog, setOpenDialog }}
        actionConfirm={{ confirmDelete, setConfirmDelete }}
      />
      <div className="bg-white card">
        <div className="border-second card-header">
          <h3 className="mb-0 text-lg font-bold">Data Pemasukan Kas</h3>
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
            <div className="flex flex-row-reverse w-full">
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
                        Keterangan
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
                        Dari Akun
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
                        Jenis Transaksi
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
                        <td colSpan={9} className="text-left">
                          Loading....
                        </td>
                      </tr>
                    )}
                    {pemasukans?.data.length > 0
                      ? pemasukans?.data.map((data, index) => (
                          <tr
                            className="border-b font-medium even:bg-white odd:bg-slate-100"
                            key={index}
                          >
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 font-medium">
                              {index + pemasukans.from}
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-left">
                              {data.kode_transaksi}
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-left">
                              {ToDate2(data.tanggal_transaksi)}
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-left">
                              {data.keterangan}
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-left">
                              {data?.untuk_akun?.jenis_transaksi}
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-left">
                              {data.dari_akun?.jenis_transaksi}
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-right">
                              <NumberFormat value={data.jumlah} />
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-left">
                              {data.jenis_transaksi}
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 flex justify-center">
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
                              &nbsp;
                              <button
                                className="btn2 bg-primary hover:opacity-80 flex items-center"
                                onClick={() => {
                                  handleCetak(data.id)
                                }}
                              >
                                <MdPrint /> &nbsp;
                                <span>Cetak</span>
                              </button>
                            </td>
                          </tr>
                        ))
                      : !isLoading && (
                          <tr>
                            <td colSpan={9} className="text-center">
                              Tidak Ada Data
                            </td>
                          </tr>
                        )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {pemasukans ? (
            <Pagination
              className="pagination-bar float-right mb-3"
              currentPage={currentPage}
              totalCount={pemasukans.total}
              pageSize={pemasukans.per_page}
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
