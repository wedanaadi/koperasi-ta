import { element } from "prop-types";
import React, { Suspense } from "react";
import { RequiredLogin } from "./components/MiddlewareAuth";
import {Outlet} from "react-router-dom"

const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const LamaAngsuran = React.lazy(() => import("./pages/LamaAngsuran/Index"));
const AddLamaAngsuran = React.lazy(() => import("./pages/LamaAngsuran/Add"));
const EditLamaAngsuran = React.lazy(() => import("./pages/LamaAngsuran/Edit"));
const JenisSimpanan = React.lazy(() => import("./pages/JenisSimpanan/Index"));
const AddJenisSimpanan = React.lazy(() => import("./pages/JenisSimpanan/Add"));
const EditJenisSimpanan = React.lazy(() =>
  import("./pages/JenisSimpanan/Edit")
);
const Marketing = React.lazy(() => import("./pages/Marketing/Index"));
const AddMarketing = React.lazy(() => import("./pages/Marketing/Add"));
const EditMarketing = React.lazy(() => import("./pages/Marketing/Edit"));
const Akun = React.lazy(() => import("./pages/Akun/Index"));
const LapAkun = React.lazy(() => import("./pages/Akun/LapAkun"));
const AddAkun = React.lazy(() => import("./pages/Akun/Add"));
const EditAkun = React.lazy(() => import("./pages/Akun/Edit"));
const Karyawan = React.lazy(() => import("./pages/Karyawan/Index"));
const AddKaryawan = React.lazy(() => import("./pages/Karyawan/Add"));
const EditKaryawan = React.lazy(() => import("./pages/Karyawan/Edit"));
const Nasabah = React.lazy(() => import("./pages/Nasabah/Index"));
const AddNasabah = React.lazy(() => import("./pages/Nasabah/Add"));
const EditNasabah = React.lazy(() => import("./pages/Nasabah/Edit"));
const Setting = React.lazy(() => import("./pages/setting/Index"));
const BA = React.lazy(() => import("./pages/setting/BiayaAdmin"));
const Sistem = React.lazy(() => import("./pages/setting/Sistem"));
const TransaksiKas = React.lazy(() => import("./pages/TransaksiKas/Index"));
const LapKas = React.lazy(() => import("./pages/TransaksiKas/LapTrx"));
const KasMasuk = React.lazy(() =>
  import("./pages/TransaksiKas/KasPemasukan/View")
);
const AddKasMasuk = React.lazy(() =>
  import("./pages/TransaksiKas/KasPemasukan/Add")
);
const EditKasMasuk = React.lazy(() =>
  import("./pages/TransaksiKas/KasPemasukan/Edit")
);
const KasKeluar = React.lazy(() =>
  import("./pages/TransaksiKas/KasPengeluaran/View")
);
const AddKasKeluar = React.lazy(() =>
  import("./pages/TransaksiKas/KasPengeluaran/Add")
);
const EditKasKeluar = React.lazy(() =>
  import("./pages/TransaksiKas/KasPengeluaran/Edit")
);
const Penyesuain = React.lazy(() =>
  import("./pages/TransaksiKas/KasPenyesuain/View")
);
const AddPenyesuain = React.lazy(() =>
  import("./pages/TransaksiKas/KasPenyesuain/Add")
);
const EditPenyesuain = React.lazy(() =>
  import("./pages/TransaksiKas/KasPenyesuain/Edit")
);
const Simpanan = React.lazy(() => import("./pages/Simpanan/Index"));
const ListLapSimpanan = React.lazy(() => import("./pages/Simpanan/ListLapSimpanan"));
const LapRekSimpanan = React.lazy(() => import("./pages/Simpanan/LapSimpanan"));
const LapKasSimpanan = React.lazy(() => import("./pages/Simpanan/KasSimpanan"));
const Setoran = React.lazy(() => import("./pages/Simpanan/Setoran/Setoran"));
const ViewSetoran = React.lazy(() => import("./pages/Simpanan/Setoran/View"));
const AddSetoran = React.lazy(() => import("./pages/Simpanan/Setoran/Add"));
const EditSetoran = React.lazy(() => import("./pages/Simpanan/Setoran/Edit"));
const Penarikan = React.lazy(() =>
  import("./pages/Simpanan/Penarikan/Penarikan")
);
const ViewPenarikan = React.lazy(() =>
  import("./pages/Simpanan/Penarikan/View")
);
const AddPenarikan = React.lazy(() => import("./pages/Simpanan/Penarikan/Add"));
const EditPenarikan = React.lazy(() =>
  import("./pages/Simpanan/Penarikan/Edit")
);

const PengajuanIndex = React.lazy(() => import("./pages/pengajuan/index"));
const ViewPengajuan = React.lazy(() => import("./pages/pengajuan/View"));
const AddPengajuan = React.lazy(() => import("./pages/pengajuan/Add"));
const EditPengajuan = React.lazy(() => import("./pages/pengajuan/Edit"));
const DetailPengajuan = React.lazy(() => import("./pages/pengajuan/Detail"));

const IndexPinjaman = React.lazy(() => import("./pages/pinjaman/Index"));
const ViewPinjaman = React.lazy(() => import("./pages/pinjaman/View"));
const AddPinjaman = React.lazy(() => import("./pages/pinjaman/Add"));
const EditPinjaman = React.lazy(() => import("./pages/pinjaman/Edit"));
const ListRiwayat = React.lazy(() => import("./pages/pinjaman/ListRiwayat"));
const LapRiwayat = React.lazy(() => import("./pages/pinjaman/LapRiwayat"));
const LapPinjaman = React.lazy(() => import("./pages/pinjaman/LapPinjaman"));

const IndexAngsuran = React.lazy(() => import("./pages/Angsuran/Index"));
const ListPinjaman = React.lazy(() => import("./pages/Angsuran/ListPinjaman"));
const ViewAngsuran = React.lazy(() => import("./pages/Angsuran/View"));
const FormAngsuran = React.lazy(() => import("./pages/Angsuran/Add"));
const FormEditAngsuran = React.lazy(() => import("./pages/Angsuran/Edit"));

export default [
  {
    path: `/`,
    element: (
      // <RequiredLogin>
      <Suspense fallback={`Loading Page....`}>
        <Home />
      </Suspense>
      // </RequiredLogin>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: `/masterdata`,
        // element: (
        //   <Suspense>
        //     <Karyawan />
        //   </Suspense>
        // ),
        children: [
          {
            path: `karyawan`,
            element: (
              <Suspense>
                <Karyawan />
              </Suspense>
            ),
          },
          {
            path: `karyawan/add`,
            element: (
              <Suspense>
                <AddKaryawan />
              </Suspense>
            ),
          },
          {
            path: `karyawan/edit`,
            element: (
              <Suspense>
                <EditKaryawan />
              </Suspense>
            ),
          },
          {
            path: `lamaAngsuran`,
            element: (
              <Suspense>
                <LamaAngsuran />
              </Suspense>
            ),
          },
          {
            path: `lamaAngsuran/add`,
            element: (
              <Suspense>
                <AddLamaAngsuran />
              </Suspense>
            ),
          },
          {
            path: `lamaAngsuran/edit`,
            element: (
              <Suspense>
                <EditLamaAngsuran />
              </Suspense>
            ),
          },
          {
            path: `marketing`,
            element: (
              <Suspense>
                <Marketing />
              </Suspense>
            ),
          },
          {
            path: `marketing/add`,
            element: (
              <Suspense>
                <AddMarketing />
              </Suspense>
            ),
          },
          {
            path: `marketing/edit`,
            element: (
              <Suspense>
                <EditMarketing />
              </Suspense>
            ),
          },
          {
            path: `jenissimpanan`,
            element: (
              <Suspense>
                <JenisSimpanan />
              </Suspense>
            ),
          },
          {
            path: `jenissimpanan/add`,
            element: (
              <Suspense>
                <AddJenisSimpanan />
              </Suspense>
            ),
          },
          {
            path: `jenissimpanan/edit`,
            element: (
              <Suspense>
                <EditJenisSimpanan />
              </Suspense>
            ),
          },
          {
            path: `akun`,
            element: (
              <Suspense>
                <Akun />
              </Suspense>
            ),
          },
          {
            path: `akun/add`,
            element: (
              <Suspense>
                <AddAkun />
              </Suspense>
            ),
          },
          {
            path: `akun/edit`,
            element: (
              <Suspense>
                <EditAkun />
              </Suspense>
            ),
          },
          {
            path: `nasabah`,
            element: (
              <Suspense>
                <Nasabah />
              </Suspense>
            ),
          },
          {
            path: `nasabah/add`,
            element: (
              <Suspense>
                <AddNasabah />
              </Suspense>
            ),
          },
          {
            path: `nasabah/edit`,
            element: (
              <Suspense>
                <EditNasabah />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: `setting`,
        element: (
          <Suspense>
            <Setting />
          </Suspense>
        ),
        children: [
          {
            path: `biayaadmin`,
            element: (
              <Suspense>
                <BA />
              </Suspense>
            ),
          },
          {
            path: `sistem`,
            element: (
              <Suspense>
                <Sistem />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: `transaksikas`,
        element: (
          <Suspense>
            <TransaksiKas />
          </Suspense>
        ),
        children: [
          {
            path: `kasmasuk`,
            element: (
              <Suspense>
                <KasMasuk />
              </Suspense>
            ),
          },
          {
            path: `kasmasuk/add`,
            element: (
              <Suspense>
                <AddKasMasuk />
              </Suspense>
            ),
          },
          {
            path: `kasmasuk/edit`,
            element: (
              <Suspense>
                <EditKasMasuk />
              </Suspense>
            ),
          },
          {
            path: `kaskeluar`,
            element: (
              <Suspense>
                <KasKeluar />
              </Suspense>
            ),
          },
          {
            path: `kaskeluar/add`,
            element: (
              <Suspense>
                <AddKasKeluar />
              </Suspense>
            ),
          },
          {
            path: `kaskeluar/edit`,
            element: (
              <Suspense>
                <EditKasKeluar />
              </Suspense>
            ),
          },
          {
            path: `kaspenyesuain`,
            element: (
              <Suspense>
                <Penyesuain />
              </Suspense>
            ),
          },
          {
            path: `kaspenyesuain/add`,
            element: (
              <Suspense>
                <AddPenyesuain />
              </Suspense>
            ),
          },
          {
            path: `kaspenyesuain/edit`,
            element: (
              <Suspense>
                <EditPenyesuain />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: `simpanan`,
        element: (
          <Suspense>
            <Simpanan />
          </Suspense>
        ),
        children: [
          {
            path: `setoran`,
            element: (
              <Suspense>
                <Setoran />
              </Suspense>
            ),
            children: [
              {
                index: true,
                element: (
                  <Suspense>
                    <ViewSetoran />
                  </Suspense>
                ),
              },
              {
                path: `add`,
                element: (
                  <Suspense>
                    <AddSetoran />
                  </Suspense>
                ),
              },
              {
                path: `edit`,
                element: (
                  <Suspense>
                    <EditSetoran />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: `penarikan`,
            element: (
              <Suspense>
                <Penarikan />
              </Suspense>
            ),
            children: [
              {
                index: true,
                element: (
                  <Suspense>
                    <ViewPenarikan />
                  </Suspense>
                ),
              },
              {
                path: `add`,
                element: (
                  <Suspense>
                    <AddPenarikan />
                  </Suspense>
                ),
              },
              {
                path: `edit`,
                element: (
                  <Suspense>
                    <EditPenarikan />
                  </Suspense>
                ),
              },
            ],
          },
        ],
      },
      {
        path: `pinjaman`,
        children: [
          {
            path: `pengajuan`,
            element: (
              <Suspense>
                <PengajuanIndex />
              </Suspense>
            ),
            children: [
              {
                index: true,
                element: (
                  <Suspense>
                    <ViewPengajuan />
                  </Suspense>
                ),
              },
              {
                path: `add`,
                element: (
                  <Suspense>
                    <AddPengajuan />
                  </Suspense>
                ),
              },
              {
                path: `edit`,
                element: (
                  <Suspense>
                    <EditPengajuan />
                  </Suspense>
                ),
              },
              {
                path: `detail`,
                element: (
                  <Suspense>
                    <DetailPengajuan />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: `pinjaman`,
            element: (
              <Suspense>
                <IndexPinjaman />
              </Suspense>
            ),
            children: [
              {
                index: true,
                element: (
                  <Suspense>
                    <ViewPinjaman />
                  </Suspense>
                ),
              },
              {
                path: `add`,
                element: (
                  <Suspense>
                    <AddPinjaman />
                  </Suspense>
                ),
              },
              {
                path: `edit`,
                element: (
                  <Suspense>
                    <EditPinjaman />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: `angsuran`,
            element: (
              <Suspense>
                <IndexAngsuran />
              </Suspense>
            ),
            children: [
              {
                index: true,
                element: (
                  <Suspense>
                    <ListPinjaman />
                  </Suspense>
                ),
              },
              {
                path: `bayar`,
                element: (
                  <Suspense>
                    <ViewAngsuran />
                  </Suspense>
                ),
              },
              {
                path: `bayar/form`,
                element: (
                  <Suspense>
                    <FormAngsuran />
                  </Suspense>
                ),
              },
              {
                path: `bayar/edit`,
                element: (
                  <Suspense>
                    <FormEditAngsuran />
                  </Suspense>
                ),
              },
            ],
          },
        ],
      },
      {
        path: `pelaporan`,
        element: (
          <Suspense>
            <Outlet/>
          </Suspense>
        ),
        children: [
          {
            path: `lapsimpanan`,
            element: (
              <Suspense>
                <ListLapSimpanan/>
              </Suspense>
            ),
          },
          {
            path: `lapsimpanan/detail`,
            element: (
              <Suspense>
                <LapRekSimpanan/>
              </Suspense>
            ),
          },
          {
            path: `lapriwayat`,
            element: (
              <Suspense>
                <ListRiwayat/>
              </Suspense>
            ),
          },
          {
            path: `lapriwayat/detail`,
            element: (
              <Suspense>
                <LapRiwayat/>
              </Suspense>
            ),
          },
          {
            path: `lappinjaman`,
            element: (
              <Suspense>
                <LapPinjaman/>
              </Suspense>
            ),
          },
          {
            path: `lapkas`,
            element: (
              <Suspense>
                <LapKas/>
              </Suspense>
            ),
          },
          {
            path: `lapkassimpanan`,
            element: (
              <Suspense>
                <LapKasSimpanan />
              </Suspense>
            ),
          },
          {
            path: `lapakun`,
            element: (
              <Suspense>
                <LapAkun />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: `/login`,
    element: (
      <Suspense>
        <Login />
      </Suspense>
    ),
  },
  {
    path: `*`,
    element: (
      <Suspense>
        <NotFound />
      </Suspense>
    ),
  },
];
