import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useStore from "../../store/useStore";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateData } from "../../api/Karyawan";
import { Input, Select, Textarea } from "../../components/Input";

export default function Edit() {
  const queryClient = useQueryClient();
  const [waiting, setWaiting] = useState(false);
  const [errorValidasi, setErrorValidasi] = useState([]);
  const [selectedValue, setSelectedValue] = useState({ value: "", label: "" },);
  const [karyawan, setKaryawan] = useState({
    nama_lengkap: "",
    alamat: "",
    no_handphone: "",
    username: "",
    password: "",
    jabatan: "",
  });
  const options = [
    { value: "direktur", label: "Direktur" },
    { value: "teller", label: "Teller" },
    { value: "admin", label: "Admin Kredit" },
  ];
  const navigasi = useNavigate();
  const toastChange = useStore((state) => state.changeState);
  const toastIcon = useStore((state) => state.iconsToast);
  const toastColors = useStore((state) => state.colorsToast);
  const tokenLogin = useStore((state) => state.token);

  const dataLokal = JSON.parse(localStorage.getItem("dataEdit"));

  useEffect(() => {
    setKaryawan({
      ...karyawan,
      ["jabatan"]: selectedValue?.value,
    });
  }, [selectedValue]);

  useEffect(() => {
    setKaryawan({
      nama_lengkap: dataLokal.nama_lengkap,
      alamat: dataLokal.alamat,
      no_handphone: dataLokal.no_handphone,
      username: dataLokal.username,
      password: "",
      jabatan: dataLokal.jabatan,
    });
    const selected = options.filter(
      ({ value }) => value == dataLokal.jabatan
    );
    setSelectedValue(selected[0]);
  }, []);

  const createKaryawanMutation = useMutation({
    networkMode: `always`,
    mutationFn: updateData,
    onSuccess: () => {
      setWaiting(false)
      queryClient.invalidateQueries({ queryKey: ["karyawan", 1] });
      navigasi(`/masterdata/karyawan`);
      toastChange({
        id: "NotifKaryawan",
        content: {
          title: "Update Data",
          description: "Update Karyawan Successfuly",
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
      setWaiting(true)
      toastChange({
        id: "NotifKaryawan",
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
      setWaiting(false)
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
        id: "NotifKaryawan",
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
    createKaryawanMutation.mutate({
      Data: karyawan,
      token: tokenLogin,
      id: dataLokal.id,
    });
  };

  const handleChangeInput = (e) => {
    setKaryawan({
      ...karyawan,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white card w-1/2">
      <div className="border-second card-header">
        <h3 className="mb-0 text-lg font-bold">Ubah Karyawan</h3>
        <div className="flex justify-center items-center">
          <Link
            to={`/masterdata/karyawan`}
            className="btn bg-slate-600 text-white hover:opacity-80 flex items-center"
          >
            <MdOutlineKeyboardBackspace /> &nbsp;
            <span>Kembali</span>
          </Link>
        </div>
      </div>
      <div className="card-body">
        <form autoComplete="off" onSubmit={handleSimpan}>
          <Input
            validasi={errorValidasi}
            label="Nama Lengkap"
            handle={handleChangeInput}
            value={karyawan}
          />
          <Input
            validasi={errorValidasi}
            label="No Handphone"
            handle={handleChangeInput}
            value={karyawan}
          />
          <Textarea
            value={karyawan}
            label={"Alamat"}
            handle={handleChangeInput}
            validasi={errorValidasi}
          />
          <Select
            value={selectedValue}
            options={options}
            label={"Jabatan"}
            alias={"Level"}
            validasi={errorValidasi}
            handle={(value) => setSelectedValue(value)}
          />
          <Input
            validasi={errorValidasi}
            label="Username"
            handle={handleChangeInput}
            value={karyawan}
          />
          <Input
            validasi={errorValidasi}
            label="Password"
            handle={handleChangeInput}
            value={karyawan}
            type="password"
          />
          <div className="w-2/12 float-right">
            <button
              className={`bg-primary ${waiting ? 'bg-opacity-50' : 'hover:bg-third'} btn mb-6`}
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
