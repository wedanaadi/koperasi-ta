import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useStore from "../../../store/useStore";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createData } from "../../../api/Kas";
import { listSelect } from "../../../api/Akun";
import { DateInput, Input, InputFormat, Select } from "../../../components/Input";
import { ConvertToEpoch } from "../../../components/Date";

export default function Add() {
  const [dateTrx, setdateTrx] = useState({
    startDate: null,
    endDate: null,
  });
  const queryClient = useQueryClient();
  const [errorValidasi, setErrorValidasi] = useState([]);
  const [selectedUntuk, setSelectedUntuk] = useState(null);
  const [selectedDari, setSelectedDari] = useState(null);
  let optionAkuns = [];
  const [penyesuain, setPenyesuain] = useState({
    tanggal_transaksi: "",
    keterangan: "",
    untuk_akun: "",
    dari_akun: "",
    jumlah: 0,
    jenis: "penyesuain",
  });
  const navigasi = useNavigate();
  const toastChange = useStore((state) => state.changeState);
  const toastIcon = useStore((state) => state.iconsToast);
  const toastColors = useStore((state) => state.colorsToast);
  const tokenLogin = useStore((state) => state.token);

  const {
    isLoading: isLoadingAkun,
    isError: isErrorAkun,
    data: akuns,
    error: errorAkun,
  } = useQuery({
    networkMode: `always`,
    queryKey: ["listSelectAkun", tokenLogin],
    queryFn: listSelect,
  });

  if (!isLoadingAkun && !isErrorAkun) {
    optionAkuns = akuns?.data;
  }

  const createPengeluaranMutation = useMutation({
    networkMode: `always`,
    mutationFn: createData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["penyesuain", 1] });
      navigasi(`/transaksikas/kaspenyesuain`);
      toastChange({
        id: "NotifKP",
        content: {
          title: "Create Data",
          description: "Create Penyesuain Kas Successfuly",
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
        id: "NotifKP",
        content: {
          title: "Create Data",
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
        id: "NotifKP",
        content: {
          title: "Create Data",
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

  useEffect(() => {
    setPenyesuain({
      ...penyesuain,
      ["untuk_akun"]: selectedUntuk?.value ? selectedUntuk.value : "",
      ["dari_akun"]: selectedDari?.value ? selectedDari.value : "",
      ["tanggal_transaksi"]: dateTrx.startDate !== null ? ConvertToEpoch(dateTrx.startDate) : "",
    });
  }, [selectedDari, selectedUntuk, dateTrx]);

  const handleSimpan = (e) => {
    e.preventDefault();
    createPengeluaranMutation.mutate({
      newData: penyesuain,
      token: tokenLogin,
      tipe: "penyesuain",
    });
  };

  const handleChangeInput = (e) => {
    setPenyesuain({
      ...penyesuain,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white card sm:w-1/2">
      <div className="border-second card-header">
        <h3 className="mb-0 text-lg font-bold">Tambah Penyesuain Kas</h3>
        <div className="flex justify-center items-center">
          <Link
            to={`/transaksikas/kaspenyesuain`}
            className="btn bg-slate-600 text-white hover:opacity-80 flex items-center"
          >
            <MdOutlineKeyboardBackspace /> &nbsp;
            <span>Kembali</span>
          </Link>
        </div>
      </div>
      <div className="card-body">
        <form autoComplete="off" onSubmit={handleSimpan}>
          <DateInput
            value={dateTrx}
            label="Tanggal Transaksi"
            handle={(value) => setdateTrx(value)}
            validasi={errorValidasi}
          />
          <Input
            validasi={errorValidasi}
            label="Keterangan"
            handle={handleChangeInput}
            value={penyesuain}
          />
          <InputFormat
            value={penyesuain}
            validasi={errorValidasi}
            label="Jumlah"
            handle={(values) => {
              setPenyesuain({
                ...penyesuain,
                ["jumlah"]: values.floatValue,
              });
            }}
          />
          <Select
            label={"Untuk Akun"}
            options={optionAkuns}
            validasi={errorValidasi}
            value={selectedUntuk}
            handle={(value) => setSelectedUntuk(value)}
          />
          <Select
            label={"Dari Akun"}
            options={optionAkuns}
            validasi={errorValidasi}
            value={selectedDari}
            handle={(value) => setSelectedDari(value)}
          />
          <div className="md:w-2/12 float-right">
            <button
              className="bg-primary hover:bg-third btn mb-6"
              type="submit"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
