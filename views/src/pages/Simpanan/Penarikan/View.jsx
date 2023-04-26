import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { MdAddCircleOutline, MdEdit, MdDeleteOutline, MdPrint } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import baseUrl from "../../../components/baseUrl";
import Search from "../../../components/Datatable/Search";
import Select from "../../../components/Tailwind/Select";
import useStore from "../../../store/useStore";
import axios from "../../../components/axiosApi";
import ToDate from "../../../components/Date";
import { NumberFormat } from "../../../components/Input";
import { deleteData } from "../../../api/Simpanan";
import Pagination from "../../../components/Datatable/Pagination/Pagination";

const ConfirmDialog = React.lazy(() =>
  import("../../../components/ConfirmAlert")
);

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
    let url = `${baseUrl}/simpanan?page=${currentPage}&perpage=${pagination.value}&tipe=0`;
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
    data: penarikans,
    error,
    refetch,
  } = useQuery({
    networkMode: `always`,
    queryKey: ["penarikan", currentPage, pagination],
    queryFn: fetchDatas,
  });

  const deleteSetoranMutation = useMutation({
    networkMode: `always`,
    mutationFn: deleteData,
    onSuccess: () => {
      setCurrentPage(1);
      queryClient.invalidateQueries({ queryKey: ["penarikan"] });
      toastChange({
        id: "NotifSetoran",
        content: {
          title: "Delete Data",
          description: "Delete data Penarikan Successfuly",
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
        id: "NotifSetoran",
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
        id: "NotifSetoran",
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
      deleteSetoranMutation.mutate({ id: id, token: tokenLogin, tipe: "penarikan" });
      setConfirmDelete(false);
      setOpenDialog(false);
    }
  };

  const handleCetak = (id) => {
    window.open(
      `${import.meta.env.VITE_BACKEND_PUBLIC}/simpanan/bukti?id=${id}&lokasi=${
        dataSetting?.lokasi ? dataSetting.lokasi : "Bali"
      }&title=tarik&alamat=${
        dataSetting?.alamat ? btoa(dataSetting.alamat) : "-"
      }`,
      "_blank"
    );
  };

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
      <div className="card bg-white">
        <div className="border-second card-header">
          <h3 className="mb-0 text-lg font-bold">Data Penarikan Simpanan</h3>
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
                        ID Nasabah
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
                        Dept
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
                        Nominal
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
                    {penarikans?.data.length > 0
                      ? penarikans?.data.map((data, index) => (
                          <tr
                            className="border-b font-medium even:bg-white odd:bg-slate-100"
                            key={index}
                          >
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 font-medium">
                              {index + penarikans.from}
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-left">
                              {data.id}
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-left">
                              {ToDate(data.tanggal_transaksi)}
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-left">
                              {data.simpanan.id_nasabah}
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-left">
                              {data.simpanan.nasabah.nama_lengkap}
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-left">
                              {data.marketing.nama_marketing}
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-left">
                              {data.simpanan.jenis_simpanan.nama_jenis_simpanan}
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-right">
                              <NumberFormat value={data.saldo} />
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
                                  handleCetak(data.simpanan_id);
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

          {penarikans ? (
            <Pagination
              className="pagination-bar float-right mb-3"
              currentPage={currentPage}
              totalCount={penarikans.total}
              pageSize={penarikans.per_page}
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
