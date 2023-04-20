import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Pagination from "../../components/Datatable/Pagination/Pagination";
import Search from "../../components/Datatable/Search";
import useStore from "../../store/useStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import baseUrl from "../../components/baseUrl";
import axios from "../../components/axiosApi.jsx";
import { deleteData } from "../../api/LamaAngsuran";
import Select from "../../components/Tailwind/Select";
import { MdAddCircleOutline, MdDeleteOutline, MdEdit } from "react-icons/md";

const ConfirmDialog = React.lazy(() => import("../../components/ConfirmAlert"));

export default function Index() {
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
    let url = `${baseUrl}/lamaangsuran?page=${currentPage}&perpage=${pagination.value}`;
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
    data: lamaAngsurans,
    error,
    refetch,
  } = useQuery({
    queryKey: ["lamaangsuran", currentPage, pagination],
    queryFn: fetchDatas,
  });

  const deleteLamaAngsuranMutation = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      setCurrentPage(1)
      queryClient.invalidateQueries({ queryKey: ["lamaangsuran"] });
      toastChange({
        id: "NotifLamaAngsuran",
        content: {
          title: "Delete Data",
          description: "Delete data Lama Angsuran Successfuly",
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
        id: "NotifLamaAngsuran",
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
      if(respon.status === 422) {
        setErrorValidasi(respon.data.errors);
        message = respon.data.msg;
      } else if(respon.status === 403) {
        message = respon.data.errors;
      } else {
        message = respon.statusText;
      }
      toastChange({
        id: "NotifLamaAngsuran",
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
      deleteLamaAngsuranMutation.mutate({ id: id, token: tokenLogin });
      setConfirmDelete(false);
      setOpenDialog(false);
    }
  };

  useEffect(() => {
    handleHapus(idSelected);
  }, [confirmDelete]);

  // if (isLoading) return "loading....";
  if (isError) return `Error ${error.message}`;

  return (
    <>
      <ConfirmDialog
        settingDialog={{ openDialog, setOpenDialog }}
        actionConfirm={{ confirmDelete, setConfirmDelete }}
      />
      <div className="bg-white card">
        <div className="border-second card-header">
          <h3 className="mb-0 text-lg font-bold">Data Lama Angsuran</h3>
          <div className="flex justify-center items-center">
            <Link to={"add"} className="flex items-center btn bg-green-700 hover:opacity-80">
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
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-auto">
                  <table className="min-w-full border-2 border-third text-center text-base font-light">
                    <thead className="border-b border-third font-medium">
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
                          Lama Angsuran
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
                          <td colSpan={3} className="text-left">Loading....</td>
                        </tr>
                      )}
                      {lamaAngsurans?.data.length > 0 ? (
                        lamaAngsurans?.data.map((data, index) => (
                          <tr
                            className="border-b font-medium even:bg-white odd:bg-slate-100"
                            key={index}
                          >
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 font-medium">
                              {index + lamaAngsurans.from}
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 text-left">
                              {data.lama_angsuran}
                            </td>
                            <td className="whitespace-nowrap border-r border-third px-6 py-2 flex justify-center">
                              <button
                                className="btn2 bg-orange-500 hover:opacity-80 flex items-center"
                                onClick={() => handleEditButton(data)}
                              >
                                <MdEdit/> &nbsp;
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
                                <MdDeleteOutline/> &nbsp;
                                <span>Hapus</span>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        !isLoading && (<tr>
                          <td colSpan={3} className="text-center">
                            Tidak Ada Data
                          </td>
                        </tr>)
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {lamaAngsurans ? (
            <Pagination
              className="pagination-bar float-right mb-3"
              currentPage={currentPage}
              totalCount={lamaAngsurans.total}
              pageSize={lamaAngsurans.per_page}
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
