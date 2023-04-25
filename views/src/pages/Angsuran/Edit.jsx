import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { listSelect } from "../../api/Akun";
import { DateInput, Input, InputFormat, Select } from "../../components/Input";
import useStore from "../../store/useStore";
import { ConvertToEpoch } from "../../components/Date";
import { createData, updateData } from "../../api/Angsuran";
import { listSelectMarketing } from "../../api/Marketing";

export default function Edit() {
  const [dateTrx, setdateTrx] = useState({
    startDate: null,
    endDate: null,
  });
  const dataPinjaman = JSON.parse(localStorage.getItem("dataPinjamanAngsuran"));
  const dataHitunganPinjaman = JSON.parse(
    localStorage.getItem("pinjamanProfile")
  );
  const queryClient = useQueryClient();
  const [errorValidasi, setErrorValidasi] = useState([]);
  const [selectedMarketing, setSelectedMarketing] = useState(null);
  const [selectedAmbilAkun, setSelectedAmbilAkun] = useState(null);
  const [selectedSimpanAkun, setSelectedSimpanAkun] = useState(null);
  const NasabahBA = useStore((state) => state.setDataNasabah);
  let optionMarketing = [];
  let optionAkun = [];
  const [angsuran, setAngsuran] = useState({
    tanggal_transaksi: "",
    no_pinjaman: "",
    nama_nasabah: "",
    pokok: 0,
    bunga: 0,
    tunggakan_pokok: 0,
    tunggakan_bunga: 0,
    denda: 0,
    bayar_pokok: 0,
    bayar_bunga: 0,
    bayar_denda: 0,
    ambil_akun: "",
    simpan_akun: "",
    marketing: "",
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
    isLoading: isLoadingMarketing,
    isError: isErrorMarketing,
    data: marketings,
    error: errorMarketing,
  } = useQuery({
    queryKey: ["listSelectMarketing", tokenLogin],
    queryFn: listSelectMarketing,
  });

  if (!isLoadingAkun && !isErrorAkun) {
    optionAkun = akuns?.data;
  }

  if (!isLoadingMarketing && !isErrorMarketing) {
    optionMarketing = marketings?.data;
  }

  useEffect(() => {
    setAngsuran({
      ...angsuran,
      ["ambil_akun"]: selectedAmbilAkun?.value ? selectedAmbilAkun.value : "",
      ["simpan_akun"]: selectedSimpanAkun?.value
        ? selectedSimpanAkun.value
        : "",
      ["marketing"]: selectedMarketing?.value ? selectedMarketing.value : "",
      ["tanggal_transaksi"]:
        dateTrx.startDate !== null ? ConvertToEpoch(dateTrx.startDate) : "",
    });
  }, [dateTrx, selectedAmbilAkun, selectedMarketing, selectedSimpanAkun]);

  useEffect(() => {
    setAngsuran({
      tanggal_transaksi: dataLokal.tanggal_transaksi,
      no_pinjaman: dataPinjaman.no_pinjaman,
      nama_nasabah: dataPinjaman.nama_nasabah,
      pokok: dataPinjaman.pokok,
      bunga: dataPinjaman.bunga,
      tunggakan_pokok: dataHitunganPinjaman.tunggakan_pokok,
      tunggakan_bunga: dataHitunganPinjaman.tunggakan_bunga,
      denda:
        parseInt(dataHitunganPinjaman.kena_denda) === 1
          ? dataPinjaman.denda
          : 0,
      bayar_pokok: dataLokal.pokok_bayar,
      bayar_bunga: dataLokal.bunga_bayar,
      bayar_denda: dataLokal.denda_bayar,
      ambil_akun: dataLokal.ambil_akun,
      simpan_akun: dataLokal.simpan_akun,
      marketing: dataLokal.marketing,
    });

    setdateTrx({
      startDate: new Date(dataLokal.tanggal_transaksi),
      endDate: new Date(dataLokal.tanggal_transaksi),
    });
  }, []);

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

  useMemo(() => {
    if (marketings?.data != undefined) {
      const selectedMarketing = optionMarketing.filter(
        ({ value }) => value == dataLokal.marketing
      );
      setSelectedMarketing(selectedMarketing[0])
    }
  }, [marketings]);

  const updateAngsuranMutation = useMutation({
    mutationFn: updateData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["angsuran", 1] });
      queryClient.invalidateQueries({ queryKey: ["profilAngsuranPinjaman"] });
      navigasi(`/pinjaman/angsuran/bayar`);
      toastChange({
        id: "NotifAngsuran",
        content: {
          title: "Update Data",
          description: "Bayar Angsuran Successfuly",
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
        id: "NotifAngsuran",
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
        id: "NotifAngsuran",
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
    updateAngsuranMutation.mutate({
      Data: angsuran,
      token: tokenLogin,
      id: dataLokal.id
    });
  };

  const handleChangeInput = (e) => {
    setAngsuran({
      ...angsuran,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="card bg-white lg:w-1/2">
      <div className="card-header">
        <h3 className="mb-0 text-lg font-bold">Ubah Pinjaman</h3>
        <div className="flex justify-center items-center">
          <Link
            to={`/pinjaman/angsuran/bayar`}
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
            label="Tanggal Transaksi"
            handle={(value) => setdateTrx(value)}
            validasi={errorValidasi}
          />
          <Input
            validasi={errorValidasi}
            label="No Pinjaman"
            handle={handleChangeInput}
            value={angsuran}
            disabled={true}
          />
          <Input
            validasi={errorValidasi}
            label="Nama Nasabah"
            handle={handleChangeInput}
            value={angsuran}
            disabled={true}
          />
          <InputFormat
            value={angsuran}
            validasi={errorValidasi}
            label="Pokok"
            alias="Angsuran Pokok Perbulan"
            handle={() => console.log("kosong")}
            disabled={true}
          />
          <InputFormat
            value={angsuran}
            validasi={errorValidasi}
            label="Bunga"
            alias="Angsuran Bunga Perbulan"
            handle={() => console.log("kosong")}
            disabled={true}
          />
          <InputFormat
            value={angsuran}
            validasi={errorValidasi}
            label="Tunggakan Pokok"
            handle={() => console.log("kosong")}
            disabled={true}
          />
          <InputFormat
            value={angsuran}
            validasi={errorValidasi}
            label="Tunggakan Bunga"
            handle={() => console.log("kosong")}
            disabled={true}
          />
          <InputFormat
            value={angsuran}
            validasi={errorValidasi}
            label="Denda"
            handle={() => console.log("kosong")}
            disabled={true}
          />
          <InputFormat
            value={angsuran}
            validasi={errorValidasi}
            label="Bayar Pokok"
            handle={(values) => {
              setAngsuran({
                ...angsuran,
                ["bayar_pokok"]: values.floatValue,
              });
            }}
          />
          <InputFormat
            value={angsuran}
            validasi={errorValidasi}
            label="Bayar Bunga"
            handle={(values) => {
              setAngsuran({
                ...angsuran,
                ["bayar_bunga"]: values.floatValue,
              });
            }}
          />
          <InputFormat
            value={angsuran}
            validasi={errorValidasi}
            label="Bayar Denda"
            handle={(values) => {
              setAngsuran({
                ...angsuran,
                ["bayar_denda"]: values.floatValue,
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
          <h1 className="underline font-bold text-lg mb-6">
            Indentitas Penyetor
          </h1>
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
