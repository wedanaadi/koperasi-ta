import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { getBiayaAdmin, updateData } from "../../api/BiayaAdmin";
import { Input, InputDecimal, InputFormat } from "../../components/Input";
import useStore from "../../store/useStore";

export default function BiayaAdmin() {
  const [errorValidasi, setErrorValidasi] = useState([]);
  const queryClient = useQueryClient();
  const toastChange = useStore((state) => state.changeState);
  const toastIcon = useStore((state) => state.iconsToast);
  const toastColors = useStore((state) => state.colorsToast);
  const tokenLogin = useStore((state) => state.token);
  const [ba1, setBa1] = useState({
    suku_bunga: 0,
    biaya_administrasi: 0,
    biaya_denda: 0,
    is_anggota: 1
  });
  const [ba2, setBa2] = useState({
    suku_bunga: 0,
    biaya_administrasi: 0,
    biaya_denda: 0,
    is_anggota: 0
  });

  const {
    isLoading: isLoading1,
    isError: isError1,
    data: BiayaAdmin1,
    error: error1,
    refetch: refetch1,
  } = useQuery({
    networkMode: `always`,
    queryKey: ["ba1", "ba-1", tokenLogin],
    queryFn: getBiayaAdmin,
  });

  const {
    isLoading: isLoading2,
    isError: isError2,
    data: BiayaAdmin2,
    error: error2,
    refetch: refetch2,
  } = useQuery({
    networkMode: `always`,
    queryKey: ["ba2", "ba-2", tokenLogin],
    queryFn: getBiayaAdmin,
  });

  const createBA1Mutation = useMutation({
    networkMode: `always`,
    mutationFn: updateData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ba1", "ba-1", tokenLogin] });
      toastChange({
        id: "NotifBA1",
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
        id: "NotifBA1",
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
        id: "NotifBA1",
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

  const createBA2Mutation = useMutation({
    networkMode: `always`,
    mutationFn: updateData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ba2", "ba-2", tokenLogin] });
      toastChange({
        id: "NotifBA2",
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
        id: "NotifBA2",
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
        id: "NotifBA2",
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

  const handleSimpanBA1 = (e) => {
    e.preventDefault();
    createBA1Mutation.mutate({
      Data: ba1,
      token: tokenLogin,
      id: "ba-1",
    });
  };

  const handleSimpanBA2 = (e) => {
    e.preventDefault();
    createBA2Mutation.mutate({
      Data: ba2,
      token: tokenLogin,
      id: "ba-2",
    });
  };

  useMemo(() => {
    if (BiayaAdmin1?.data != undefined) {
      const { suku_bunga, biaya_administrasi, biaya_denda, is_anggota } = BiayaAdmin1.data;
      setBa1({
        suku_bunga,
        biaya_administrasi,
        biaya_denda,
        is_anggota:"1",
      });
    }
    if (BiayaAdmin2?.data != undefined) {
      const { suku_bunga, biaya_administrasi, biaya_denda, is_anggota } = BiayaAdmin2.data;
      setBa2({
        suku_bunga,
        biaya_administrasi,
        biaya_denda,
        is_anggota:"0",
      });
    }
  }, [BiayaAdmin1, BiayaAdmin2]);

  if (isLoading1 || isLoading2) return `Loading....`;
  if (isError1) {
    return `Error ${error1.message}`;
  } else if (isError2) {
    return `Error ${error2.message}`;
  }

  return (
    <div className="sm:flex gap-x-4 w-full sm:justify-center">
      <div className="bg-white card sm:w-4/12 mb-4 sm:mb-0">
        <div className="card-header">
          <h3 className="mb-0 text-lg font-bold w-full text-center">Anggota</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSimpanBA1} autoComplete="off">
            <InputDecimal
              value={ba1}
              label="Suku Bunga"
              alias="Suku Bunga (%) / Tahun"
              validasi={errorValidasi}
              handle={(values) => {
                setBa1({
                  ...ba1,
                  ["suku_bunga"]: values.floatValue,
                });
              }}
            />
            <InputFormat
              value={ba1}
              label="Biaya Administrasi"
              alias="Biaya Administrasi (Rp)"
              validasi={errorValidasi}
              handle={(values) => {
                setBa1({
                  ...ba1,
                  ["biaya_administrasi"]: values.floatValue,
                });
              }}
            />
            <InputFormat
              value={ba1}
              label="Biaya Denda"
              alias="Biaya Denda (Rp)"
              validasi={errorValidasi}
              handle={(values) => {
                setBa1({
                  ...ba1,
                  ["biaya_denda"]: values.floatValue,
                });
              }}
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

      <div className="bg-white card sm:w-4/12">
        <div className="card-header">
          <h3 className="mb-0 text-lg font-bold w-full text-center">
            Non Anggota
          </h3>
        </div>
        <div className="card-body">
        <form onSubmit={handleSimpanBA2} autoComplete="off">
            <InputDecimal
              value={ba2}
              label="Suku Bunga"
              alias="Suku Bunga (%) / Tahun"
              validasi={errorValidasi}
              handle={(values) => {
                setBa2({
                  ...ba2,
                  ["suku_bunga"]: values.floatValue,
                });
              }}
            />
            <InputFormat
              value={ba2}
              label="Biaya Administrasi"
              alias="Biaya Administrasi (Rp)"
              validasi={errorValidasi}
              handle={(values) => {
                setBa2({
                  ...ba2,
                  ["biaya_administrasi"]: values.floatValue,
                });
              }}
            />
            <InputFormat
              value={ba2}
              label="Biaya Denda"
              alias="Biaya Denda (Rp)"
              validasi={errorValidasi}
              handle={(values) => {
                setBa2({
                  ...ba2,
                  ["biaya_denda"]: values.floatValue,
                });
              }}
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
    </div>
  );
}
