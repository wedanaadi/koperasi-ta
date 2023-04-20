import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import { getList } from "../../api/Karyawan";
import { getSetting, updateData } from "../../api/Setting";
import { Input, Select, Textarea } from "../../components/Input";
import useStore from "../../store/useStore";

export default function Sistem() {
  const [errorValidasi, setErrorValidasi] = useState([]);
  const [selectedDirektur, setSelectedDirektur] = useState(null);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [selectedTeller, setSelectedTeller] = useState(null);
  const queryClient = useQueryClient();
  const toastChange = useStore((state) => state.changeState);
  const toastIcon = useStore((state) => state.iconsToast);
  const toastColors = useStore((state) => state.colorsToast);
  const tokenLogin = useStore((state) => state.token);

  let listDirektur = [];
  let listAdmin = [];
  let listTeller = [];
  const [setting, setSetting] = useState({
    lokasi: "",
    direktur: "",
    admin: "",
    teller: "",
    alamat: "",
  });

  const {
    isLoading: isLoadingDirektur,
    isError: isErrorDirektur,
    data: direkturs,
    error: errorDirektur,
    refetch: refetchDirektur,
  } = useQuery({
    queryKey: ["direktur", "direktur", tokenLogin],
    queryFn: getList,
  });

  const {
    isLoading: isLoadingAdmin,
    isError: isErrorAdmin,
    data: admins,
    error: errorAdmin,
    refetch: refetchAdmin,
  } = useQuery({
    queryKey: ["admin", "admin", tokenLogin],
    queryFn: getList,
  });

  const {
    isLoading: isLoadingTeller,
    isError: isErrorTeller,
    data: tellers,
    error: errorTeller,
    refetch: refetchTeller,
  } = useQuery({
    queryKey: ["teller", "teller", tokenLogin],
    queryFn: getList,
  });

  const {
    isLoading,
    isError,
    data: settings,
    error,
    refetch,
  } = useQuery({
    queryKey: ["setting", tokenLogin],
    queryFn: getSetting,
  });

  const handleChangeInput = (e) => {
    setSetting({
      ...setting,
      [e.target.name]: e.target.value,
    });
  };

  if (!isLoadingDirektur && !isErrorDirektur) {
    listDirektur = direkturs?.data;
  }
  if (!isLoadingAdmin && !isErrorAdmin) {
    listAdmin = admins?.data;
  }
  if (!isLoadingTeller && !isErrorTeller) {
    listTeller = tellers?.data;
  }

  const createSistemMutation = useMutation({
    mutationFn: updateData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["setting", tokenLogin] });
      toastChange({
        id: "NotifSetting",
        content: {
          title: "Update Data",
          description: "Update Setting Biaya Successfuly",
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
        id: "NotifSetting",
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
        id: "NotifSetting",
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

  useMemo(() => {
    if (settings?.data != undefined) {
      const { lokasi, alamat, direktur, admin, teller } = settings?.data;
      setSetting({
        lokasi,
        alamat,
        direktur,
        admin,
        teller,
      });
    }
  }, [settings]);

  useMemo(()=>{
      if (settings?.data != undefined) {
      const { lokasi, alamat, direktur, admin, teller } = settings?.data;
      const selectedDirektur = listDirektur.filter(
        ({ value }) => value == direktur
      );
      setSelectedDirektur(selectedDirektur[0]);

      const selectedAdmin = listAdmin.filter(({ value }) => value == admin);
      setSelectedAdmin(selectedAdmin[0]);

      const selectedTeller = listTeller.filter(({ value }) => value == teller);
      setSelectedTeller(selectedTeller[0]);
    }
  },[direkturs, admins, tellers])

  useEffect(() => {
    setSetting({
      ...setting,
      ["direktur"]: selectedDirektur?.value ? selectedDirektur.value : "",
      ["admin"]: selectedAdmin?.value ? selectedAdmin.value : "",
      ["teller"]: selectedTeller?.value ? selectedTeller.value : "",
    });
  }, [selectedAdmin, selectedDirektur, selectedTeller]);

  const handleSimpan = (e) => {
    e.preventDefault();
    createSistemMutation.mutate({
      Data: setting,
      token: tokenLogin,
      id: "1",
    });
  };

  return (
    <div className="card bg-white w-6/12">
      <div className="card-header">
        <h3 className="mb-0 text-lg font-bold w-full text-center">Setting</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSimpan} autoComplete="off">
          <Select
            label={"Direktur"}
            options={listDirektur}
            validasi={errorValidasi}
            value={selectedDirektur}
            handle={(value) => setSelectedDirektur(value)}
          />
          <Select
            label={"Admin"}
            options={listAdmin}
            validasi={errorValidasi}
            value={selectedAdmin}
            handle={(value) => setSelectedAdmin(value)}
          />
          <Select
            label={"Teller"}
            options={listTeller}
            validasi={errorValidasi}
            value={selectedTeller}
            handle={(value) => setSelectedTeller(value)}
          />
          <Input
            label={"Lokasi"}
            value={setting}
            validasi={errorValidasi}
            handle={handleChangeInput}
          />
          <Textarea
            label={"Alamat"}
            value={setting}
            validasi={errorValidasi}
            handle={handleChangeInput}
          />
          <div className="float-right">
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
