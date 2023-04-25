import React from "react";
import { NumberFormat } from "../../components/Input";

export default function Rincian({ settingDialog, dataProps }) {
  const { openRincian, setOpenRincian } = settingDialog;
  return (
    <div
      className={`fixed ${
        !openRincian && "hidden"
      } inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-[999] duration-700`}
      id="my-modal"
    >
      <div className="relative top-20 mx-auto border w-96 shadow-lg rounded-md bg-white">
        <div className="flex justify-between px-5 py-2">
          <h3 className="text-lg font-semibold">Rincian</h3>
          <span
            onClick={() => setOpenRincian(!openRincian)}
            className="cursor-pointer text-xl font-semibold"
          >
            x
          </span>
        </div>
        <hr className="border-b-2 border-third" />
        <div className="p-5 ">
          <table className="w-full">
            <tbody>
              <tr>
                <td>Sisa Bakidebet</td>
                <td>:</td>
                <td>
                  <NumberFormat
                    value={
                      dataProps?.sisa_pinjaman ? dataProps.sisa_pinjaman : 0
                    }
                  />
                </td>
              </tr>
              <tr>
                <td>Tunggakan Pokok</td>
                <td>:</td>
                <td>
                  <NumberFormat
                    value={
                      dataProps?.tunggakan_pokok ? dataProps.tunggakan_pokok : 0
                    }
                  />
                </td>
              </tr>
              <tr>
                <td>Tunggakan Bunga</td>
                <td>:</td>
                <td>
                  <NumberFormat
                    value={
                      dataProps?.tunggakan_bunga ? dataProps.tunggakan_bunga : 0
                    }
                  />
                </td>
              </tr>
              <tr>
                <td>Denda</td>
                <td>:</td>
                <td>
                  <NumberFormat
                    value={
                      parseInt(dataProps?.kena_denda) === 1 ? dataProps.denda : 0
                    }
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
