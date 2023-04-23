import React from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { Link } from "react-router-dom";
import ToDate from "../../components/Date";
import { NumberFormat } from "../../components/Input";
import useStore from "../../store/useStore";

export default function Detail() {
  const dataSetting = useStore((state) => state.dataSetting);
  const dataLokal = JSON.parse(localStorage.getItem("dataDetail"));

  return (
    <>
      <div className="card bg-white px-3 py-2">
        <div className="card-header">
          <h3 className="mb-0 text-lg font-bold">Detail Pengajuan Pinjaman</h3>
          <div className="flex justify-center items-center">
            <Link
              to={`/pinjaman/pengajuan`}
              className="btn bg-slate-600 text-white hover:opacity-80 flex items-center"
              onClick={()=>localStorage.removeItem('dataDetail') }
            >
              <MdOutlineKeyboardBackspace /> &nbsp;
              <span>Kembali</span>
            </Link>
          </div>
        </div>
        <div className="card-body">
          <h3 className="float-right font-semibold text-lg mb-1">
            KOPERASI KARYA UTAMA MANDIRI
          </h3>
          <div className="flex justify-between items-center w-full mb-4">
            <span className="text-base font-medium underline">
              Detail Pengajuan Simpanan
            </span>
            <span className="text-xs font-medium">
              {dataSetting?.alamat ? dataSetting.alamat : "Bali"}
            </span>
          </div>
          <div className="flex flex-col overflow-x-auto">
            <div className="sm:-mx-6 lg:-mx-8 xl:-mx-0">
              <div className="min-w-full py-2 sm:px-6 lg:px-8 xl:px-0">
                <table className="text-base font-semibold">
                  <tr>
                    <td>Tanggal Pengajuan</td>
                    <td>&nbsp; : &nbsp;</td>
                    <td>{ToDate(dataLokal.tanggal_pengajuan)}</td>
                  </tr>
                  <tr>
                    <td>Kode Pengajuan</td>
                    <td>&nbsp; : &nbsp;</td>
                    <td>{dataLokal.kode_pengajuan}</td>
                  </tr>
                  <tr>
                    <td>ID Nasabah</td>
                    <td>&nbsp; : &nbsp;</td>
                    <td>{dataLokal.id_nasabah}</td>
                  </tr>
                  <tr>
                    <td>Nama Lengkap</td>
                    <td>&nbsp; : &nbsp;</td>
                    <td>{dataLokal.nama_lengkap}</td>
                  </tr>
                  <tr>
                    <td>Penggunaan</td>
                    <td>&nbsp; : &nbsp;</td>
                    <td>{dataLokal.keperluan}</td>
                  </tr>
                  <tr>
                    <td>Jumlah Pinjaman</td>
                    <td>&nbsp; : &nbsp;</td>
                    <td>
                      {<NumberFormat value={dataLokal.jumlah_pinjaman} />}
                    </td>
                  </tr>
                  <tr>
                    <td>Biaya Admin</td>
                    <td>&nbsp; : &nbsp;</td>
                    <td>{<NumberFormat value={dataLokal.biaya_admin} />}</td>
                  </tr>
                  <tr>
                    <td>Suku Bunga</td>
                    <td>&nbsp; : &nbsp;</td>
                    <td>{<NumberFormat value={dataLokal.suku_bunga} />}</td>
                  </tr>
                  <tr>
                    <td>Jangka Waktu</td>
                    <td>&nbsp; : &nbsp;</td>
                    <td>
                      {
                        <NumberFormat
                          value={dataLokal.jangka_waktu.lama_angsuran}
                        />
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>Marketing</td>
                    <td>&nbsp; : &nbsp;</td>
                    <td>{dataLokal.marketing.nama_marketing}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
