import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useStore from "../../store/useStore";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateData } from "../../api/Nasabah";
import { DateInput, Input, Select, Textarea } from "../../components/Input";
import { ConvertToEpoch } from "../../components/Date";

export default function Edit() {
  const [dateTglDaftar, setDateTglDaftar] = useState({
    startDate: null,
    endDate: null,
  });

  const queryClient = useQueryClient();
  const [errorValidasi, setErrorValidasi] = useState([]);
  const [selectedJK, setSelectedJK] = useState(null);
  const [selectedAgama, setSelectedAgama] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedJabatan, setSelectedJabatan] = useState(null);
  const [nasabah, setNasabah] = useState({
    tanggal_daftar: "",
    nama_lengkap: "",
    inisial: "",
    jenis_kelamin: "",
    agama: "",
    alamat: "",
    status: "",
    pekerjaan: "",
    nama_ibu_kandung: "",
    jabatan: "",
    no_ktp: "",
  });
  const optionJabatan = [
    { value: "anggota", label: "Anggota" },
    { value: "bukan", label: "Bukan Anggota" },
  ];
  const optionJK = [
    { value: "L", label: "Laki-Laki" },
    { value: "P", label: "Perempuan" },
  ];
  const optionStatus = [
    { value: "menikah", label: "Menikah" },
    { value: "belum", label: "Belum Menikah" },
  ];
  const optionAgama = [
    { value: "Islam", label: "Islam" },
    { value: "Kristen", label: "Kristen" },
    { value: "Katolik", label: "Katolik" },
    { value: "Hindu", label: "Hindu" },
    { value: "budha", label: "budha" },
    { value: "Konghucu", label: "Konghucu" },
  ];
  const navigasi = useNavigate();
  const toastChange = useStore((state) => state.changeState);
  const toastIcon = useStore((state) => state.iconsToast);
  const toastColors = useStore((state) => state.colorsToast);
  const tokenLogin = useStore((state) => state.token);

  const dataLokal = JSON.parse(localStorage.getItem("dataEdit"));

  useEffect(() => {
    setNasabah({
      ...nasabah,
      ["jabatan"]: selectedJabatan?.value ? selectedJabatan.value : "",
      ["jenis_kelamin"]: selectedJK?.value ? selectedJK.value : "",
      ["status"]: selectedStatus?.value ? selectedStatus.value : "",
      ["agama"]: selectedAgama?.value ? selectedAgama.value : "",
      ["tanggal_daftar"]: ConvertToEpoch(dateTglDaftar.startDate),
    });
  }, [
    selectedAgama,
    selectedJK,
    selectedJabatan,
    selectedStatus,
    dateTglDaftar,
  ]);

  useEffect(() => {
    setNasabah({
      nama_lengkap: dataLokal.nama_lengkap,
      inisial: dataLokal.inisial,
      alamat: dataLokal.alamat,
      pekerjaan: dataLokal.pekerjaan,
      nama_ibu_kandung: dataLokal.nama_ibu_kandung,
      no_ktp: dataLokal.no_ktp,
      jabatan: dataLokal.jabatan,
      agama: dataLokal.agama,
      status: dataLokal.status,
      jenis_kelamin: dataLokal.jenis_kelamin,
      tanggal_daftar: dataLokal.tanggal_daftar,
    });
    const selectedJK = optionJK.filter(({ value }) => value == dataLokal.jenis_kelamin);
    setSelectedJK(selectedJK[0]);
    const selectedStatus = optionStatus.filter(({ value }) => value == dataLokal.status);
    setSelectedStatus(selectedStatus[0]);
    const selectedAgama = optionAgama.filter(({ value }) => value == dataLokal.agama);
    setSelectedAgama(selectedAgama[0]);
    const selectedJabatan = optionJabatan.filter(({ value }) => value == dataLokal.jabatan);
    setSelectedJabatan(selectedJabatan[0]);
    setDateTglDaftar({
      startDate: new Date(dataLokal.tanggal_daftar),
      endDate: new Date(dataLokal.tanggal_daftar)
    })
  }, []);

  const createNasabahMutation = useMutation({
    mutationFn: updateData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["nasabah", 1] });
      navigasi(`/masterdata/nasabah`);
      toastChange({
        id: "NotifNasabah",
        content: {
          title: "Update Data",
          description: "Update Nasabah Successfuly",
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
        id: "NotifNasabah",
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
        id: "NotifNasabah",
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
    createNasabahMutation.mutate({
      Data: nasabah,
      token: tokenLogin,
      id: dataLokal.id,
    });
  };

  const handleChangeInput = (e) => {
    setNasabah({
      ...nasabah,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white card">
      <div className="border-second card-header">
        <h3 className="mb-0 text-lg font-bold">Ubah Nasabah</h3>
        <div className="flex justify-center items-center">
          <Link
            to={`/masterdata/nasabah`}
            className="btn bg-slate-600 text-white hover:opacity-80 flex items-center"
          >
            <MdOutlineKeyboardBackspace /> &nbsp;
            <span>Kembali</span>
          </Link>
        </div>
      </div>
      <div className="card-body">
        <form autoComplete="off" onSubmit={handleSimpan}>
          <div className="md:flex md:gap-x-4">
            <div className="md:w-3/12">
              <DateInput
                value={dateTglDaftar}
                label="Tanggal Daftar"
                handle={(value) => setDateTglDaftar(value)}
                validasi={errorValidasi}
              />
            </div>
            <div className="md:w-6/12">
              <Input
                validasi={errorValidasi}
                label="Nama Lengkap"
                handle={handleChangeInput}
                value={nasabah}
              />
            </div>
            <div className="md:w-3/12">
              <Input
                validasi={errorValidasi}
                label="Inisial"
                handle={handleChangeInput}
                value={nasabah}
              />
            </div>
          </div>
          <div className="md:flex md:gap-x-4">
            <div className="md:w-3/12">
              <Input
                validasi={errorValidasi}
                label="No KTP"
                handle={handleChangeInput}
                value={nasabah}
              />
            </div>
            <div className="md:w-3/12">
              <Select
                value={selectedJK}
                options={optionJK}
                label={"Jenis Kelamin"}
                validasi={errorValidasi}
                handle={(value) => setSelectedJK(value)}
              />
            </div>
            <div className="md:w-3/12">
              <Select
                value={selectedAgama}
                options={optionAgama}
                label={"Agama"}
                validasi={errorValidasi}
                handle={(value) => setSelectedAgama(value)}
              />
            </div>
            <div className="md:w-3/12">
              <Select
                value={selectedStatus}
                options={optionStatus}
                label={"Status"}
                validasi={errorValidasi}
                handle={(value) => setSelectedStatus(value)}
              />
            </div>
          </div>
          <div className="md:flex md:gap-x-4">
            <div className="md:w-3/12">
              <Input
                validasi={errorValidasi}
                label="Pekerjaan"
                handle={handleChangeInput}
                value={nasabah}
              />
            </div>
            <div className="md:w-6/12">
              <Input
                validasi={errorValidasi}
                label="Nama Ibu Kandung"
                handle={handleChangeInput}
                value={nasabah}
              />
            </div>
            <div className="md:w-4/12">
              <Select
                value={selectedJabatan}
                options={optionJabatan}
                label={"Jabatan"}
                validasi={errorValidasi}
                handle={(value) => setSelectedJabatan(value)}
              />
            </div>
          </div>
          <Textarea
            value={nasabah}
            label={"Alamat"}
            handle={handleChangeInput}
            validasi={errorValidasi}
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
