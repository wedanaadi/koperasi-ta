import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { listSelectJW } from "../../api/LamaAngsuran";
import { findNasabah, listSelectNasabah } from "../../api/Nasabah";
import { listSelect } from "../../api/Akun";
import {
  DateInput,
  Input,
  InputDecimal,
  InputFormat,
  Select,
} from "../../components/Input";
import useStore from "../../store/useStore";
import { ConvertToEpoch } from "../../components/Date";
import { updateData } from "../../api/Pinjaman";

export default function Edit() {
  const [dateTrx, setdateTrx] = useState({
    startDate: null,
    endDate: null,
  });
  const queryClient = useQueryClient();
  const [errorValidasi, setErrorValidasi] = useState([]);
  const [selectedJW, setSelectedJW] = useState(null);
  const [selectedNasabah, setSelectedNasabah] = useState(null);
  const [selectedAmbilAkun, setSelectedAmbilAkun] = useState(null);
  const [selectedSimpanAkun, setSelectedSimpanAkun] = useState(null);
  const NasabahBA = useStore((state) => state.setDataNasabah);
  let optionJW = [];
  let optionNasabah = [];
  let optionAkun = [];
  const [pinjaman, setPinjaman] = useState({
    tanggal_pinjaman: "",
    nasabah: "",
    id_nasabah: "",
    jumlah_pinjaman: 0,
    jangka_waktu: 0,
    suku_bunga: 0,
    biaya_admin: 0,
    ambil_akun: "",
    simpan_akun: "",
    nama_lengkap: "",
  });
  const navigasi = useNavigate();
  const toastChange = useStore((state) => state.changeState);
  const toastIcon = useStore((state) => state.iconsToast);
  const toastColors = useStore((state) => state.colorsToast);
  const tokenLogin = useStore((state) => state.token);

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
    isLoading: isLoadingAkun,
    isError: isErrorAkun,
    data: akuns,
    error: errorAkun,
  } = useQuery({
    networkMode: `always`,
    queryKey: ["listSelectAkun", tokenLogin],
    queryFn: listSelect,
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
  if (!isLoadingAkun && !isErrorAkun) {
    optionAkun = akuns?.data;
  }
  if (!isLoadingJW && !isErrorJW) {
    optionJW = jangkaWaktus?.data;
  }

  useEffect(() => {
    setPinjaman({
      ...pinjaman,
      ["jangka_waktu"]: selectedJW?.value ? selectedJW.value : "",
      ["ambil_akun"]: selectedAmbilAkun?.value ? selectedAmbilAkun.value : "",
      ["simpan_akun"]: selectedSimpanAkun?.value
        ? selectedSimpanAkun.value
        : "",
      ["nasabah"]: selectedNasabah?.value ? selectedNasabah.value : "",
      ["tanggal_pinjaman"]:
        dateTrx.startDate !== null ? ConvertToEpoch(dateTrx.startDate) : "",
    });
  }, [
    selectedJW,
    dateTrx,
    selectedAmbilAkun,
    selectedNasabah,
    selectedSimpanAkun,
  ]);

  useEffect(() => {
    setPinjaman({
      tanggal_pinjaman: dataLokal.tanggal_pinjaman,
      nasabah: dataLokal.id_nasabah,
      id_nasabah: dataLokal.id_nasabah,
      jumlah_pinjaman: dataLokal.jumlah_pinjaman,
      jangka_waktu: dataLokal.jangka_waktu.id,
      suku_bunga: dataLokal.suku_bunga,
      biaya_admin: dataLokal.biaya_admin,
      ambil_akun: dataLokal.ambil_akun,
      simpan_akun: dataLokal.simpan_akun,
      nama_lengkap: dataLokal.nama_nasabah,
    });

    setdateTrx({
      startDate: new Date(dataLokal.tanggal_pinjaman),
      endDate: new Date(dataLokal.tanggal_pinjaman),
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
    if (jangkaWaktus?.data != undefined) {
      const selectedJW = optionJW.filter(
        ({ value }) => value == dataLokal.jangka_waktu.id
      );
      setSelectedJW(selectedJW[0])
    }
  }, [jangkaWaktus]);

  useMemo(() => {
    if (akuns?.data != undefined) {
      const selectedAmbilAkun = optionAkun.filter(
        ({ value }) => value == dataLokal.ambil_akun
      );
      setSelectedAmbilAkun(selectedAmbilAkun[0])
      const selectedSimpanAkun = optionAkun.filter(
        ({ value }) => value == dataLokal.simpan_akun
      );
      setSelectedSimpanAkun(selectedSimpanAkun[0])
    }
  }, [akuns]);

  const createBAMutation = useMutation({
    networkMode: `always`,
    mutationFn: findNasabah,
    onSuccess: (res) => {
      const {biaya,nasabah} = res.data;
      NasabahBA({
        nasabah: nasabah,
        administrasi: biaya
      })

      setPinjaman({
        ...pinjaman,
        id_nasabah: nasabah.id_nasabah,
        nama_lengkap: nasabah.nama_lengkap,
        suku_bunga: parseFloat(biaya.suku_bunga),
        biaya_admin: parseFloat(biaya.biaya_administrasi),
      })
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

  const updateMutation = useMutation({
    networkMode: `always`,
    mutationFn: updateData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pinjaman", 1] });
      navigasi(`/pinjaman/pinjaman`);
      toastChange({
        id: "NotifPinjaman",
        content: {
          title: "Create Data",
          description: "Create Pinjaman Successfuly",
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
        id: "NotifPinjaman",
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
        id: "NotifPinjaman",
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

  useEffect(()=>{
    if(pinjaman.nasabah!==''){
      createBAMutation.mutate({
        idNasabah: pinjaman.nasabah,
        token:tokenLogin
      })
    }
  },[pinjaman.nasabah])

  const handleSimpan = (e) => {
    e.preventDefault();
    updateMutation.mutate({
      Data: pinjaman,
      token: tokenLogin,
      id: dataLokal.id
    });
  };

  const handleChangeInput = (e) => {
    setPinjaman({
      ...pinjaman,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="card bg-white lg:w-1/2">
      <div className="card-header">
        <h3 className="mb-0 text-lg font-bold">Ubah Pinjaman</h3>
        <div className="flex justify-center items-center">
          <Link
            to={`/pinjaman/pinjaman`}
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
            label="Tanggal Pinjaman"
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
            value={pinjaman}
            disabled={true}
          />
          <InputFormat
            value={pinjaman}
            validasi={errorValidasi}
            label="Jumlah Pinjaman"
            handle={(values) => {
              setPinjaman({
                ...pinjaman,
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
            value={pinjaman}
            label="Suku Bunga"
            alias="Suku Bunga (%) / Tahun"
            validasi={errorValidasi}
            handle={(values) => {
              setPinjaman({
                ...pengajuan,
                ["suku_bunga"]: values.floatValue,
              });
            }}
          />
          <InputFormat
            disabled={true}
            value={pinjaman}
            validasi={errorValidasi}
            label="Biaya Admin"
            handle={(values) => {
              setPinjaman({
                ...pinjaman,
                ["biaya_admin"]: values.floatValue,
              });
            }}
          />
          <Select
            label={"Ambil Akun"}
            alias={"Ambil dari Akun"}
            options={optionAkun}
            validasi={errorValidasi}
            value={selectedAmbilAkun}
            handle={(value) => setSelectedAmbilAkun(value)}
            ccPosition={"absolute"}
          />
          <Select
            label={"Simpan Akun"}
            alias={"Simpan dari Akun"}
            options={optionAkun}
            validasi={errorValidasi}
            value={selectedSimpanAkun}
            handle={(value) => setSelectedSimpanAkun(value)}
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
