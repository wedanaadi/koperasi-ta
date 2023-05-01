import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useStore from "../../store/useStore";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateData } from "../../api/LamaAngsuran";
import { Input } from "../../components/Input";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

export default function Edit() {
  const queryClient = useQueryClient();
  const [waiting, setWaiting] = useState(false);
  const [errorValidasi, setErrorValidasi] = useState([]);
  const [lamaAngsuran, setLamaAngsuran] = useState({
    lama_angsuran: "",
  });
  const navigasi = useNavigate();
  const toastChange = useStore((state) => state.changeState);
  const toastIcon = useStore((state) => state.iconsToast);
  const toastColors = useStore((state) => state.colorsToast);
  const tokenLogin = useStore((state) => state.token);

  const dataLokal = JSON.parse(localStorage.getItem("dataEdit"));

  useEffect(() => {
    setLamaAngsuran({
      lama_angsuran: dataLokal.lama_angsuran,
    });
  }, []);

  const createLamaAngsuranMutation = useMutation({
    networkMode: `always`,
    mutationFn: updateData,
    onSuccess: () => {
      setWaiting(false)
      queryClient.invalidateQueries({ queryKey: ["lamaangsuran", 1] });
      navigasi(`/masterdata/lamaangsuran`);
      toastChange({
        id: "NotifAddLamaAngsuran",
        content: {
          title: "Update Data",
          description: "Update Lama Angsuran Successfuly",
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
        id: "NotifAddLamaAngsuran",
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
        id: "NotifLamaAngsuran",
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
    createLamaAngsuranMutation.mutate({
      Data: lamaAngsuran,
      token: tokenLogin,
      id: dataLokal.id,
    });
  };

  const handleChangeInput = (e) => {
    setLamaAngsuran({
      ...lamaAngsuran,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white card w-1/2">
      <div className="border-second card-header">
        <h3 className="mb-0 text-lg font-bold">Ubah Lama Angsuran</h3>
        <div className="flex justify-center items-center">
          <Link
            to={`/masterdata/lamaangsuran`}
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
            label={"Lama Angsuran"}
            value={lamaAngsuran}
            handle={handleChangeInput}
            validasi={errorValidasi}
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
