import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useStore from "../../../store/useStore";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateData } from "../../../api/Simpanan";
import { listSelect } from "../../../api/Akun";
import { listSelectJenisSimpanan } from "../../../api/JenisSimpanan";
import { listSelectNasabah } from "../../../api/Nasabah";
import { listSelectMarketing } from "../../../api/Marketing";
import {
  DateInput,
  Input,
  InputFormat,
  Select,
} from "../../../components/Input";
import { ConvertToEpoch } from "../../../components/Date";

export default function Edit() {
  const [dateTrx, setdateTrx] = useState({
    startDate: null,
    endDate: null,
  });
  const queryClient = useQueryClient();
  const [errorValidasi, setErrorValidasi] = useState([]);
  const [selectedUntuk, setSelectedUntuk] = useState(null);
  const [selectedJS, setSelectedJS] = useState(null);
  const [selectedNasabah, setSelectedNasabah] = useState(null);
  const [selectedMarketing, setSelectedMarketing] = useState(null);
  let optionAkuns = [];
  let optionJS = [];
  let optionNasabah = [];
  let optionMarketing = [];
  const [setoran, setSetoran] = useState({
    tanggal_transaksi: "",
    nasabah: "",
    jenis_simpanan: "",
    jumlah_setoran: 0,
    keterangan: "",
    untuk_akun: "",
    marketing: "",
    tipe: "setoran",
  });
  const navigasi = useNavigate();
  const toastChange = useStore((state) => state.changeState);
  const toastIcon = useStore((state) => state.iconsToast);
  const toastColors = useStore((state) => state.colorsToast);
  const tokenLogin = useStore((state) => state.token);

  const dataLokal = JSON.parse(localStorage.getItem("dataEdit"));

  const {
    isLoading: isLoadingAkun,
    isError: isErrorAkun,
    data: akuns,
    error: errorAkun,
  } = useQuery({
    queryKey: ["listSelectAkun", tokenLogin],
    queryFn: listSelect,
  });

  const {
    isLoading: isLoadingNasabah,
    isError: isErrorNasabah,
    data: nasabahs,
    error: errorNasabah,
  } = useQuery({
    queryKey: ["listSelectNasabah", tokenLogin],
    queryFn: listSelectNasabah,
  });

  const {
    isLoading: isLoadingJS,
    isError: isErrorJS,
    data: jenisSimpanans,
    error: errorJS,
  } = useQuery({
    queryKey: ["listSelectJS", tokenLogin],
    queryFn: listSelectJenisSimpanan,
  });

  const {
    isLoading: isLoadingMarketing,
    isError: isErrorMarketing,
    data: marketings,
    error: errorMarketing,
  } = useQuery({
    queryKey: ["listSelectMarketing", tokenLogin],
    queryFn: listSelectMarketing,
  });

  if (!isLoadingAkun && !isErrorAkun) {
    optionAkuns = akuns?.data;
  }
  if (!isLoadingJS && !isErrorJS) {
    optionJS = jenisSimpanans?.data;
  }
  if (!isLoadingNasabah && !isErrorNasabah) {
    optionNasabah = nasabahs?.data;
  }
  if (!isLoadingMarketing && !isErrorMarketing) {
    optionMarketing = marketings?.data;
  }

  useEffect(() => {
    setSetoran({
      ...setoran,
      ["untuk_akun"]: selectedUntuk?.value ? selectedUntuk.value : "",
      ["jenis_simpanan"]: selectedJS?.value ? selectedJS.value : "",
      ["marketing"]: selectedMarketing?.value ? selectedMarketing.value : "",
      ["nasabah"]: selectedNasabah?.value ? selectedNasabah.value : "",
      ["tanggal_transaksi"]:
        dateTrx.startDate !== null ? ConvertToEpoch(dateTrx.startDate) : "",
    });
  }, [selectedJS, selectedUntuk, dateTrx, selectedMarketing, selectedNasabah]);

  useEffect(() => {
    setSetoran({
      tanggal_transaksi: dataLokal.tanggal_transaksi,
      nasabah: dataLokal.simpanan.id_nasabah,
      jumlah_setoran: dataLokal.saldo,
      jenis_simpanan: dataLokal.simpanan.jenis_simpanan.id,
      keterangan: dataLokal.keterangan,
      untuk_akun: dataLokal.untuk_akun.id,
      marketing: dataLokal.marketing.id,
      tipe: "setoran",
    });

    setdateTrx({
      startDate: new Date(dataLokal.tanggal_transaksi),
      endDate: new Date(dataLokal.tanggal_transaksi),
    });
  }, []);

  useMemo(() => {
    if (akuns?.data != undefined) {
      const selectedUntuk = optionAkuns.filter(
        ({ value }) => value == dataLokal.untuk_akun.id
      );
      setSelectedUntuk(selectedUntuk[0])
    }
  }, [akuns]);

  useMemo(() => {
    if (nasabahs?.data != undefined) {
      const selectedNasabah = optionNasabah.filter(
        ({ value }) => value == dataLokal.simpanan.id_nasabah
      );
      setSelectedNasabah(selectedNasabah[0])
    }
  }, [nasabahs]);

  useMemo(() => {
    if (jenisSimpanans?.data != undefined) {
      const selectedJS = optionJS.filter(
        ({ value }) => value == dataLokal.simpanan.jenis_simpanan.id
      );
      setSelectedJS(selectedJS[0])
    }
  }, [jenisSimpanans]);

  useMemo(() => {
    if (marketings?.data != undefined) {
      const selectedMarketing = optionMarketing.filter(
        ({ value }) => value == dataLokal.marketing.id
      );
      setSelectedMarketing(selectedMarketing[0])
    }
  }, [marketings]);

  const createPengeluaranMutation = useMutation({
    mutationFn: updateData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["setoran", 1] });
      navigasi(`/simpanan/setoran`);
      toastChange({
        id: "NotifKP",
        content: {
          title: "Update Data",
          description: "Update Setoran Successfuly",
          backgroundColor: toastColors.success,
          icon: toastIcon.check,
        },
        position: "top-right",
        dismiss: true,
        duration: 3000,
      });
      localStorage.removeItem("dataEdit");
    },
    onMutate: () => {
      toastChange({
        id: "NotifKP",
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
        id: "NotifKP",
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

  const handleSimpan = (e) => {
    e.preventDefault();
    createPengeluaranMutation.mutate({
      Data: setoran,
      token: tokenLogin,
      id: dataLokal.id
    });
  };

  const handleChangeInput = (e) => {
    setSetoran({
      ...setoran,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white card lg:w-1/2">
      <div className="border-second card-header">
        <h3 className="mb-0 text-lg font-bold">Ubah Setoran</h3>
        <div className="flex justify-center items-center">
          <Link
            to={`/simpanan/setoran`}
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
            // flex={true}
          />
          <Select
            label={"Nasabah"}
            options={optionNasabah}
            validasi={errorValidasi}
            value={selectedNasabah}
            handle={(value) => setSelectedNasabah(value)}
            // flex={true}
            ccPosition="absolute"
          />
          <Select
            label={"Jenis Simpanan"}
            options={optionJS}
            validasi={errorValidasi}
            value={selectedJS}
            handle={(value) => setSelectedJS(value)}
            // flex={true}
            ccPosition="absolute"
          />
          <InputFormat
            // flex={true}
            value={setoran}
            validasi={errorValidasi}
            label="Jumlah Setoran"
            handle={(values) => {
              setSetoran({
                ...setoran,
                ["jumlah_setoran"]: values.floatValue,
              });
            }}
          />
          <Input
            // flex={true}
            validasi={errorValidasi}
            label="Keterangan"
            handle={handleChangeInput}
            value={setoran}
          />
          <Select
            label={"Untuk Akun"}
            options={optionAkuns}
            validasi={errorValidasi}
            value={selectedUntuk}
            handle={(value) => setSelectedUntuk(value)}
            // flex={true}
            ccPosition="absolute"
          />
          <h1 className="underline font-bold text-lg mb-6">
            Indentitas Penyetor
          </h1>
          <Select
            label={"Marketing"}
            options={optionMarketing}
            validasi={errorValidasi}
            value={selectedMarketing}
            handle={(value) => setSelectedMarketing(value)}
            // flex={true}
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
