import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { listSelectMarketing } from "../../api/Marketing";
import { listSelectNasabah, findNasabah } from "../../api/Nasabah";
import { updateData } from "../../api/Pengajuan";
import { listSelectJW } from "../../api/LamaAngsuran";
import {
  DateInput,
  Input,
  InputDecimal,
  InputFormat,
  Select,
} from "../../components/Input";
import useStore from "../../store/useStore";
import { ConvertToEpoch } from "../../components/Date";

export default function Edit() {
  const [dateTrx, setdateTrx] = useState({
    startDate: null,
    endDate: null,
  });
  const queryClient = useQueryClient();
  const [errorValidasi, setErrorValidasi] = useState([]);
  const [selectedJW, setSelectedJW] = useState(null);
  const [selectedNasabah, setSelectedNasabah] = useState(null);
  const [selectedMarketing, setSelectedMarketing] = useState(null);
  let optionJW = [];
  let optionNasabah = [];
  let optionMarketing = [];
  const [pengajuan, setPengajuan] = useState({
    tanggal_pengajuan: "",
    nasabah: "",
    id_nasabah: "",
    jumlah_pinjaman: 0,
    jangka_waktu: 0,
    suku_bunga: 0,
    biaya_admin: 0,
    keperluan: "",
    marketing: "",
    nama_lengkap: "",
  });
  const navigasi = useNavigate();
  const toastChange = useStore((state) => state.changeState);
  const toastIcon = useStore((state) => state.iconsToast);
  const toastColors = useStore((state) => state.colorsToast);
  const tokenLogin = useStore((state) => state.token);
  const NasabahBA = useStore((state) => state.setDataNasabah);

  const dataLokal = JSON.parse(localStorage.getItem("dataEdit"));

  const {
    isLoading: isLoadingNasabah,
    isError: isErrorNasabah,
    data: nasabahs,
    error: errorNasabah,
  } = useQuery({
    networkMode: `always`,
    queryKey: ["listSelectNasabah", tokenLogin],
    queryFn: listSelectNasabah,
  });

  const {
    isLoading: isLoadingMarketing,
    isError: isErrorMarketing,
    data: marketings,
    error: errorMarketing,
  } = useQuery({
    networkMode: `always`,
    queryKey: ["listSelectMarketing", tokenLogin],
    queryFn: listSelectMarketing,
  });

  const {
    isLoading: isLoadingJW,
    isError: isErrorJW,
    data: jangkaWaktus,
    error: errorJW,
  } = useQuery({
    networkMode: `always`,
    queryKey: ["listSelectJW", tokenLogin],
    queryFn: listSelectJW,
  });

  if (!isLoadingNasabah && !isErrorNasabah) {
    optionNasabah = nasabahs?.data;
  }
  if (!isLoadingMarketing && !isErrorMarketing) {
    optionMarketing = marketings?.data;
  }
  if (!isLoadingJW && !isErrorJW) {
    optionJW = jangkaWaktus?.data;
  }

  useEffect(() => {
    setPengajuan({
      ...pengajuan,
      ["jangka_waktu"]: selectedJW?.value ? selectedJW.value : "",
      ["marketing"]: selectedMarketing?.value ? selectedMarketing.value : "",
      ["nasabah"]: selectedNasabah?.value ? selectedNasabah.value : "",
      ["tanggal_pengajuan"]:
        dateTrx.startDate !== null ? ConvertToEpoch(dateTrx.startDate) : "",
    });
  }, [selectedJW, dateTrx, selectedMarketing, selectedNasabah]);

  useEffect(() => {
    setPengajuan({
      tanggal_pengajuan: dataLokal.tanggal_pengajuan,
      nasabah: dataLokal.id_nasabah,
      id_nasabah: dataLokal.id_nasabah,
      jumlah_pinjaman: dataLokal.jumlah_pinjaman,
      jangka_waktu: dataLokal.jangka_waktu.id,
      suku_bunga: dataLokal.suku_bunga,
      biaya_admin: dataLokal.biaya_admin,
      keperluan: dataLokal.keperluan,
      marketing: dataLokal.marketing.id,
      nama_lengkap: dataLokal.nama_lengkap,
    });

    setdateTrx({
      startDate: new Date(dataLokal.tanggal_pengajuan),
      endDate: new Date(dataLokal.tanggal_pengajuan),
    });
  }, []);

  useMemo(() => {
    if (nasabahs?.data != undefined) {
      const selectedNasabah = optionNasabah.filter(
        ({ value }) => value == dataLokal.id_nasabah
      );
      setSelectedNasabah(selectedNasabah[0])
    }
  }, [nasabahs]);

  useMemo(() => {
    if (marketings?.data != undefined) {
      const selectedMarketing = optionMarketing.filter(
        ({ value }) => value == dataLokal.marketing.id
      );
      setSelectedMarketing(selectedMarketing[0])
    }
  }, [marketings]);

  useMemo(() => {
    if (jangkaWaktus?.data != undefined) {
      const selectedJW = optionJW.filter(
        ({ value }) => value == dataLokal.jangka_waktu.id
      );
      setSelectedJW(selectedJW[0])
    }
  }, [jangkaWaktus]);

  const createBAMutation = useMutation({
    networkMode: `always`,
    mutationFn: findNasabah,
    onSuccess: (res) => {
      const { biaya, nasabah } = res.data;
      NasabahBA({
        nasabah: nasabah,
        administrasi: biaya,
      });

      setPengajuan({
        ...pengajuan,
        id_nasabah: nasabah.id_nasabah,
        nama_lengkap: nasabah.nama_lengkap,
        suku_bunga: parseFloat(biaya.suku_bunga),
        biaya_admin: parseFloat(biaya.biaya_administrasi),
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
        id: "NotifBA",
        content: {
          title: "Get Biaya Administrasi",
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

  const createPengajuanMutation = useMutation({
    networkMode: `always`,
    mutationFn: updateData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pengajuan", 1] });
      navigasi(`/pinjaman/pengajuan`);
      toastChange({
        id: "NotifPengajuan",
        content: {
          title: "Update Data",
          description: "Update Pengajuan Successfuly",
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

  useEffect(() => {
    if (pengajuan.nasabah !== "") {
      createBAMutation.mutate({
        idNasabah: pengajuan.nasabah,
        token: tokenLogin,
      });
    }
  }, [pengajuan.nasabah]);

  const handleSimpan = (e) => {
    e.preventDefault();
    createPengajuanMutation.mutate({
      Data: pengajuan,
      token: tokenLogin,
      id: dataLokal.id,
    });
  };

  const handleChangeInput = (e) => {
    setPengajuan({
      ...pengajuan,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="card bg-white lg:w-1/2">
      <div className="card-header">
        <h3 className="mb-0 text-lg font-bold">Ubah Pengajuan Pinjaman</h3>
        <div className="flex justify-center items-center">
          <Link
            to={`/pinjaman/pengajuan`}
            className="btn bg-slate-600 text-white hover:opacity-80 flex items-center"
          >
            <MdOutlineKeyboardBackspace /> &nbsp;
            <span>Kembali</span>
          </Link>
        </div>
      </div>
      <div className="card-body">
        <form action="" autoComplete="off" onSubmit={handleSimpan}>
          <DateInput
            value={dateTrx}
            label="Tanggal Pengajuan"
            handle={(value) => setdateTrx(value)}
            validasi={errorValidasi}
          />
          <Select
            label={"Nasabah"}
            options={optionNasabah}
            validasi={errorValidasi}
            value={selectedNasabah}
            handle={(value) => setSelectedNasabah(value)}
            ccPosition="absolute"
          />
          <Input
            validasi={errorValidasi}
            label="ID Nasabah"
            handle={handleChangeInput}
            value={pengajuan}
            disabled={true}
          />
          <InputFormat
            value={pengajuan}
            validasi={errorValidasi}
            label="Jumlah Pinjaman"
            handle={(values) => {
              setPengajuan({
                ...pengajuan,
                ["jumlah_pinjaman"]: values.floatValue,
              });
            }}
          />
          <Select
            label={"Jangka Waktu"}
            options={optionJW}
            validasi={errorValidasi}
            value={selectedJW}
            handle={(value) => setSelectedJW(value)}
            ccPosition="absolute"
          />
          <InputDecimal
            disabled={true}
            value={pengajuan}
            label="Suku Bunga"
            alias="Suku Bunga (%)"
            validasi={errorValidasi}
            handle={(values) => {
              setPengajuan({
                ...pengajuan,
                ["suku_bunga"]: values.floatValue,
              });
            }}
          />
          <InputFormat
            disabled={true}
            value={pengajuan}
            validasi={errorValidasi}
            label="Biaya Admin"
            handle={(values) => {
              setPengajuan({
                ...pengajuan,
                ["biaya_admin"]: values.floatValue,
              });
            }}
          />
          <Input
            validasi={errorValidasi}
            label="Keperluan"
            handle={handleChangeInput}
            value={pengajuan}
          />
          <Select
            label={"Marketing"}
            options={optionMarketing}
            validasi={errorValidasi}
            value={selectedMarketing}
            handle={(value) => setSelectedMarketing(value)}
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
