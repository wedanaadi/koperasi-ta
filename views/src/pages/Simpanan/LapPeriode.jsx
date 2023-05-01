import { MdPrint } from "react-icons/md";
import Select from "../../components/Tailwind/Select";
import { DateInput, NumberFormat } from "../../components/Input";
import { useState } from "react";
import useStore from "../../store/useStore";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import baseUrl from "../../components/baseUrl";
import axios from "../../components/axiosApi";
import { ConvertToEpoch, ToDate2 } from "../../components/Date";
import Pagination from "../../components/Datatable/Pagination/Pagination";

export default function LapPeriode() {
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
  const [typeLap, setTypeLap] = useState({
    label: "Semua Laporan",
    value: "all",
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
  const optionsType = [
    {
      value: "all",
      label: "Semua Laporan",
    },
    {
      value: "tarik",
      label: "Penarikan",
    },
    {
      value: "setor",
      label: "Penyetoran",
    },
  ];
  const navigasi = useNavigate();
  const queryClient = useQueryClient();

  const fetchDatas = async () => {
    let url = `${baseUrl}/simpananperiode?page=${currentPage}&perpage=${
      pagination.value
    }&periode=${ConvertToEpoch(dateTrx.startDate)},${ConvertToEpoch(
      dateTrx.endDate
    )}&tipe=${typeLap.value}`;
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
    data: lapPeriodes,
    error,
  } = useQuery({
    networkMode: `always`,
    queryKey: ["lapPeriodeSimpanan", currentPage, pagination, dateTrx, typeLap],
    queryFn: fetchDatas,
  });

  const handleCetak = () => {
    window.open(
      `${import.meta.env.VITE_BACKEND_PUBLIC}/simpananperiode/cetak?lokasi=${
        dataSetting?.lokasi ? dataSetting.lokasi : "Bali"
      }&alamat=${
        dataSetting?.alamat ? btoa(dataSetting.alamat) : "-"
      }&direktur=${
        dataSetting?.direktur ? btoa(dataSetting.direktur) : "-"
      }&teller=${
        dataSetting?.teller ? btoa(dataSetting.teller) : "-"
      }&periode=${ConvertToEpoch(dateTrx.startDate)},${ConvertToEpoch(
        dateTrx.endDate
      )}&tipe=${typeLap.value}`,
      "_blank"
    );
  };

  return (
    <div className="card bg-white">
      <div className="border-second card-header">
        <h3 className="mb-0 text-lg font-bold">Laporan Periode Simpanan</h3>
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
          <div className="w-full sm:w-2/12">
            <Select
              placeHolder="Page..."
              options={optionsType}
              cssPotision="absolute"
              editValue={typeLap}
              onChange={(value) => {
                setTypeLap(value);
              }}
            />
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
                      Kode Transaksi
                    </th>
                    <th scope="col" className="border-r border-third px-6 py-4">
                      Tanggal
                    </th>
                    <th scope="col" className="border-r border-third px-6 py-4">
                      Nama Nasabah
                    </th>
                    <th scope="col" className="border-r border-third px-6 py-4">
                      Dept
                    </th>
                    <th scope="col" className="border-r border-third px-6 py-4">
                      Jenis Simpanan
                    </th>
                    <th scope="col" className="border-r border-third px-6 py-4">
                      Tipe
                    </th>
                    <th scope="col" className="border-r border-third px-6 py-4">
                      Nominal
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
                  {lapPeriodes?.data.length > 0
                    ? lapPeriodes?.data.map((data, index) => (
                        <tr
                          className="border-b font-medium even:bg-white odd:bg-slate-100"
                          key={index}
                        >
                          <td className="whitespace-nowrap border-r border-third px-6 py-2 font-medium">
                            {index + lapPeriodes?.from}
                          </td>
                          <td className="whitespace-nowrap border-r border-third px-6 py-2 text-left">
                            {data.id}
                          </td>
                          <td className="whitespace-nowrap border-r border-third px-6 py-2 text-left">
                            {ToDate2(data.tanggal_transaksi)}
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
                          <td className="whitespace-nowrap border-r border-third px-6 py-2 text-left">
                            {parseInt(data.type) === 0
                              ? "Penarikan"
                              : "Penyetoran"}
                          </td>
                          <td className="whitespace-nowrap border-r border-third px-6 py-2 text-right">
                            <NumberFormat value={data.saldo} />
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
        {lapPeriodes?.data ? (
          <Pagination
            className="pagination-bar float-right mb-3"
            currentPage={currentPage}
            totalCount={lapPeriodes.total}
            pageSize={lapPeriodes.per_page}
            onPageChange={(page) => setCurrentPage(page)}
          />
        ) : (
          false
        )}
      </div>
    </div>
  );
}
