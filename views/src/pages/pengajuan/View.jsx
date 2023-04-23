import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { Suspense, useEffect, useState } from "react";
import {
  MdAddCircleOutline,
  MdEdit,
  MdDeleteOutline,
  MdCheckCircleOutline,
  MdDangerous,
  MdPreview,
} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import baseUrl from "../../components/baseUrl";
import Search from "../../components/Datatable/Search";
import Select from "../../components/Tailwind/Select";
import useStore from "../../store/useStore";
import axios from "../../components/axiosApi";
import ToDate from "../../components/Date";
import { NumberFormat } from "../../components/Input";
import Pagination from "../../components/Datatable/Pagination/Pagination";
import { deleteData, updateStatus } from "../../api/Pengajuan";

const ConfirmDialog = React.lazy(() => import("../../components/ConfirmAlert"));
const ConfirmAction = React.lazy(() =>
  import("../../components/ConfirmAlert2")
);

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
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(false);
  const [valueStatus, setValueStatus] = useState(false);
  const [textConfrim, setTextConfirm] = useState({
    text: "",
    msg: "",
    button: "",
  });
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
    let url = `${baseUrl}/pengajuan?page=${currentPage}&perpage=${pagination.value}`;
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
    data: pengajuans,
    error,
    refetch,
  } = useQuery({
    queryKey: ["pengajuan", currentPage, pagination],
    queryFn: fetchDatas,
  });

  const deletePengajuanMutation = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      setCurrentPage(1);
      queryClient.invalidateQueries({ queryKey: ["pengajuan"] });
      toastChange({
        id: "NotifPengajuan",
        content: {
          title: "Delete Data",
          description: "Delete data Pengjuan Kas Successfuly",
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
        id: "NotifPengajuan",
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
        id: "NotifPengajuan",
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

  const updateStatusMutation = useMutation({
    mutationFn: updateStatus,
    onSuccess: () => {
      setCurrentPage(1);
      queryClient.invalidateQueries({ queryKey: ["pengajuan"] });
      toastChange({
        id: "NotifPengajuan",
        content: {
          title: "Update Data",
          description: "Update Status Pengajuan Successfuly",
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
        id: "NotifPengajuan",
        content: {
          title: "Update Data",
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
        id: "NotifPengajuan",
        content: {
          title: "Update Data",
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

  const handleDetailButton = (data) => {
    localStorage.setItem("dataDetail", JSON.stringify(data));
    navigasi("detail", { replace: true });
  };

  const handleHapus = (id) => {
    if (confirmDelete) {
      deletePengajuanMutation.mutate({ id: id, token: tokenLogin });
      setConfirmDelete(false);
      setOpenDialog(false);
    }
  };

  const handleAction = (id) => {
    if (confirmAction) {
      updateStatusMutation.mutate({
        Data: { status: valueStatus },
        token: tokenLogin,
        id: id,
      });
      setConfirmAction(false);
      setOpenConfirm(false);
    }
  };

  useEffect(() => {
    handleHapus(idSelected);
  }, [confirmDelete]);

  useEffect(() => {
    handleAction(idSelected);
  }, [confirmAction]);

  if (isError) return `Error ${error.message}`;
  return (
    <>
      <ConfirmDialog
        settingDialog={{ openDialog, setOpenDialog }}
        actionConfirm={{ confirmDelete, setConfirmDelete }}
      />
      <Suspense>
        <ConfirmAction
          settingDialog={{ openConfirm, setOpenConfirm }}
          actionConfirm={{ confirmAction, setConfirmAction }}
          text={textConfrim}
        />
      </Suspense>
      <div className="card bg-white">
        <div className="border-second card-header">
          <h3 className="mb-0 text-lg font-bold">Data Pengajuan</h3>
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
                        Kode Pengajuan
                      </th>
                      <th
                        scope="col"
                        className="border-r border-third px-6 py-4"
                      >
                        Tanggal Pengajuan
                      </th>
                      <th
                        scope="col"
                        className="border-r border-third px-6 py-4"
                      >
                        ID Nasabah
                      </th>
                      <th
                        scope="col"
                        className="border-r border-third px-6 py-4"
                      >
                        Jenis Kredit
                      </th>
                      <th
                        scope="col"
                        className="border-r border-third px-6 py-4"
                      >
                        Nama Lengkap
                      </th>
                      <th
                        scope="col"
                        className="border-r border-third px-6 py-4"
                      >
                        Jumlah Pinjaman
                      </th>
                      <th
                        scope="col"
                        className="border-r border-third px-6 py-4"
                      >
                        Jangka Waktu
                      </th>
                      <th
                        scope="col"
                        className="border-r border-third px-6 py-4"
                      >
                        Keperluan
                      </th>
                      <th
                        scope="col"
                        className="border-r border-third px-6 py-4"
                      >
                        Marketing
                      </th>
                      <th
                        scope="col"
                        className="border-r border-third px-6 py-4"
                      >
                        Status
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
                        <td colSpan={12} className="text-left">
                          Loading....
                        </td>
                      </tr>
                    )}
                    {pengajuans?.data.length > 0
                      ? pengajuans?.data.map((data, index) => (
                          <tr
                            className="border-b font-medium even:bg-white odd:bg-slate-100"
                            key={index}
                          >
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 font-medium">
                              {index + pengajuans.from}
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-left">
                              {data.kode_pengajuan}
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-left">
                              {ToDate(data.tanggal_pengajuan)}
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-left">
                              {data.id_nasabah}
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-left">
                              {data.jenis_kredit}
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-left">
                              {data.nama_lengkap}
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-right">
                              <NumberFormat value={data.jumlah_pinjaman} />
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-right">
                              {data.jangka_waktu.lama_angsuran}
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-left">
                              {data.keperluan}
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-left">
                              {data.marketing.nama_marketing}
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-left">
                              {data.status === 0
                                ? "Menunggu"
                                : data.status === 1
                                ? "Diterima"
                                : "Ditolak"}
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 flex justify-center">
                              {parseInt(data.status) !== 2 && (
                                <>
                                  <button
                                    className="btn2 bg-teal-800 hover:opacity-80 flex items-center"
                                    onClick={() => handleDetailButton(data)}
                                  >
                                    <MdPreview /> &nbsp;
                                    <span>Detail</span>
                                  </button>
                                  &nbsp;
                                </>
                              )}
                              {parseInt(data.status) === 0 && (
                                <>
                                  <button
                                    className="btn2 bg-green-600 hover:opacity-80 flex items-center"
                                    onClick={() => {
                                      setOpenConfirm(!openConfirm);
                                      setTextConfirm({
                                        title: "Terima Pengajuan",
                                        msg: "Anda yakin menerima pengajuan pinjaman?",
                                        button: "Terima",
                                      });
                                      setIDSelected(data.id);
                                      setValueStatus("1");
                                    }}
                                  >
                                    <MdCheckCircleOutline /> &nbsp;
                                    <span>Terima</span>
                                  </button>
                                  &nbsp;
                                  <button
                                    className="btn2 bg-red-600 hover:opacity-80 flex items-center"
                                    onClick={() => {
                                      setOpenConfirm(!openConfirm);
                                      setTextConfirm({
                                        title: "Tolak Pengajuan",
                                        msg: "Anda yakin menolak pengajuan pinjaman?",
                                        button: "Tolak",
                                      });
                                      setIDSelected(data.id);
                                      setValueStatus("2");
                                    }}
                                  >
                                    <MdDangerous /> &nbsp;
                                    <span>Tolak</span>
                                  </button>
                                  &nbsp;
                                </>
                              )}
                              {parseInt(data.status) === 0 && (
                                <>
                                  <button
                                    className="btn2 bg-orange-500 hover:opacity-80 flex items-center"
                                    onClick={() => handleEditButton(data)}
                                  >
                                    <MdEdit /> &nbsp;
                                    <span>Edit</span>
                                  </button>
                                  &nbsp;
                                </>
                              )}
                              {parseInt(data.status) !== 1 && (
                                <>
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
                                </>
                              )}
                            </td>
                          </tr>
                        ))
                      : !isLoading && (
                          <tr>
                            <td colSpan={12} className="text-center">
                              Tidak Ada Data
                            </td>
                          </tr>
                        )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {pengajuans ? (
            <Pagination
              className="pagination-bar float-right mb-3"
              currentPage={currentPage}
              totalCount={pengajuans.total}
              pageSize={pengajuans.per_page}
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
