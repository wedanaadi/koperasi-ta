import { element } from "prop-types";
import React, { Suspense } from "react";
import { RequiredLogin } from "./components/MiddlewareAuth";
import { RoleAuthorization } from "./components/RoleAuth";
import { Outlet } from "react-router-dom";

const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Forbidden = React.lazy(() => import("./pages/Forbidden"));
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
const ListLapSimpanan = React.lazy(() =>
  import("./pages/Simpanan/ListLapSimpanan")
);
const LapRekSimpanan = React.lazy(() => import("./pages/Simpanan/LapSimpanan"));
const LapKasSimpanan = React.lazy(() => import("./pages/Simpanan/KasSimpanan"));
const LapPeriodeSimpanan = React.lazy(() =>
  import("./pages/Simpanan/LapPeriode")
);
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
const ValidasiPengajuan = React.lazy(() =>
  import("./pages/pengajuan/ViewValidasi")
);
const AddPengajuan = React.lazy(() => import("./pages/pengajuan/Add"));
const EditPengajuan = React.lazy(() => import("./pages/pengajuan/Edit"));
const DetailPengajuan = React.lazy(() => import("./pages/pengajuan/Detail"));
const DetailValidasiPengajuan = React.lazy(() =>
  import("./pages/pengajuan/DetailValidasi")
);

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
import LoadingPage from "./pages/LoadingPage";

export default [
  {
    path: `/`,
    element: (
      <RequiredLogin>
        <Suspense fallback={<LoadingPage />}>
          <Home />
        </Suspense>
      </RequiredLogin>
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
              <RoleAuthorization allowRoles={["direktur"]}>
                <Suspense>
                  <Karyawan />
                </Suspense>
              </RoleAuthorization>
            ),
          },
          {
            path: `karyawan/add`,
            element: (
              <RoleAuthorization allowRoles={["direktur"]}>
                <Suspense>
                  <AddKaryawan />
                </Suspense>
              </RoleAuthorization>
            ),
          },
          {
            path: `karyawan/edit`,
            element: (
              <RoleAuthorization allowRoles={["direktur"]}>
                <Suspense>
                  <EditKaryawan />
                </Suspense>
              </RoleAuthorization>
            ),
          },
          {
            path: `lamaAngsuran`,
            element: (
              <RoleAuthorization allowRoles={["direktur"]}>
                <Suspense>
                  <LamaAngsuran />
                </Suspense>
              </RoleAuthorization>
            ),
          },
          {
            path: `lamaAngsuran/add`,
            element: (
              <RoleAuthorization allowRoles={["direktur"]}>
                <Suspense>
                  <AddLamaAngsuran />
                </Suspense>
              </RoleAuthorization>
            ),
          },
          {
            path: `lamaAngsuran/edit`,
            element: (
              <RoleAuthorization allowRoles={["direktur"]}>
                <Suspense>
                  <EditLamaAngsuran />
                </Suspense>
              </RoleAuthorization>
            ),
          },
          {
            path: `marketing`,
            element: (
              <RoleAuthorization allowRoles={["direktur"]}>
                <Suspense>
                  <Marketing />
                </Suspense>
              </RoleAuthorization>
            ),
          },
          {
            path: `marketing/add`,
            element: (
              <RoleAuthorization allowRoles={["direktur"]}>
                <Suspense>
                  <AddMarketing />
                </Suspense>
              </RoleAuthorization>
            ),
          },
          {
            path: `marketing/edit`,
            element: (
              <RoleAuthorization allowRoles={["direktur"]}>
                <Suspense>
                  <EditMarketing />
                </Suspense>
              </RoleAuthorization>
            ),
          },
          {
            path: `jenissimpanan`,
            element: (
              <RoleAuthorization allowRoles={["direktur"]}>
                <Suspense>
                  <JenisSimpanan />
                </Suspense>
              </RoleAuthorization>
            ),
          },
          {
            path: `jenissimpanan/add`,
            element: (
              <RoleAuthorization allowRoles={["direktur"]}>
                <Suspense>
                  <AddJenisSimpanan />
                </Suspense>
              </RoleAuthorization>
            ),
          },
          {
            path: `jenissimpanan/edit`,
            element: (
              <RoleAuthorization allowRoles={["direktur"]}>
                <Suspense>
                  <EditJenisSimpanan />
                </Suspense>
              </RoleAuthorization>
            ),
          },
          {
            path: `akun`,
            element: (
              <RoleAuthorization allowRoles={["direktur"]}>
                <Suspense>
                  <Akun />
                </Suspense>
              </RoleAuthorization>
            ),
          },
          {
            path: `akun/add`,
            element: (
              <RoleAuthorization allowRoles={["direktur"]}>
                <Suspense>
                  <AddAkun />
                </Suspense>
              </RoleAuthorization>
            ),
          },
          {
            path: `akun/edit`,
            element: (
              <RoleAuthorization allowRoles={["direktur"]}>
                <Suspense>
                  <EditAkun />
                </Suspense>
              </RoleAuthorization>
            ),
          },
          {
            path: `nasabah`,
            element: (
              <RoleAuthorization allowRoles={["direktur","teller"]}>
                <Suspense>
                  <Nasabah />
                </Suspense>
              </RoleAuthorization>
            ),
          },
          {
            path: `nasabah/add`,
            element: (
              <RoleAuthorization allowRoles={["direktur","teller"]}>
                <Suspense>
                  <AddNasabah />
                </Suspense>
              </RoleAuthorization>
            ),
          },
          {
            path: `nasabah/edit`,
            element: (
              <RoleAuthorization allowRoles={["direktur","teller"]}>
                <Suspense>
                  <EditNasabah />
                </Suspense>
              </RoleAuthorization>
            ),
          },
        ],
      },
      {
        path: `setting`,
        element: (
          <RoleAuthorization allowRoles={["direktur"]}>
            <Suspense>
              <Setting />
            </Suspense>
          </RoleAuthorization>
        ),
        children: [
          {
            path: `biayaadmin`,
            element: (
              <RoleAuthorization allowRoles={["direktur"]}>
                <Suspense>
                  <BA />
                </Suspense>
              </RoleAuthorization>
            ),
          },
          {
            path: `sistem`,
            element: (
              <RoleAuthorization allowRoles={["direktur"]}>
                <Suspense>
                  <Sistem />
                </Suspense>
              </RoleAuthorization>
            ),
          },
        ],
      },
      {
        path: `transaksikas`,
        element: (
          <RoleAuthorization allowRoles={["direktur","teller"]}>
            <Suspense>
              <TransaksiKas />
            </Suspense>
          </RoleAuthorization>
        ),
        children: [
          {
            path: `kasmasuk`,
            element: (
              <RoleAuthorization allowRoles={["direktur","teller"]}>
                <Suspense>
                  <KasMasuk />
                </Suspense>
              </RoleAuthorization>
            ),
          },
          {
            path: `kasmasuk/add`,
            element: (
              <RoleAuthorization allowRoles={["direktur","teller"]}>
                <Suspense>
                  <AddKasMasuk />
                </Suspense>
              </RoleAuthorization>
            ),
          },
          {
            path: `kasmasuk/edit`,
            element: (
              <RoleAuthorization allowRoles={["direktur","teller"]}>
                <Suspense>
                  <EditKasMasuk />
                </Suspense>
              </RoleAuthorization>
            ),
          },
          {
            path: `kaskeluar`,
            element: (
              <RoleAuthorization allowRoles={["direktur","teller"]}>
                <Suspense>
                  <KasKeluar />
                </Suspense>
              </RoleAuthorization>
            ),
          },
          {
            path: `kaskeluar/add`,
            element: (
              <RoleAuthorization allowRoles={["direktur","teller"]}>
                <Suspense>
                  <AddKasKeluar />
                </Suspense>
              </RoleAuthorization>
            ),
          },
          {
            path: `kaskeluar/edit`,
            element: (
              <RoleAuthorization allowRoles={["direktur","teller"]}>
                <Suspense>
                  <EditKasKeluar />
                </Suspense>
              </RoleAuthorization>
            ),
          },
          {
            path: `kaspenyesuain`,
            element: (
              <RoleAuthorization allowRoles={["direktur","teller"]}>
                <Suspense>
                  <Penyesuain />
                </Suspense>
              </RoleAuthorization>
            ),
          },
          {
            path: `kaspenyesuain/add`,
            element: (
              <RoleAuthorization allowRoles={["direktur","teller"]}>
                <Suspense>
                  <AddPenyesuain />
                </Suspense>
              </RoleAuthorization>
            ),
          },
          {
            path: `kaspenyesuain/edit`,
            element: (
              <RoleAuthorization allowRoles={["direktur","teller"]}>
                <Suspense>
                  <EditPenyesuain />
                </Suspense>
              </RoleAuthorization>
            ),
          },
        ],
      },
      {
        path: `simpanan`,
        element: (
          <RoleAuthorization allowRoles={["direktur","teller"]}>
            <Suspense>
              <Simpanan />
            </Suspense>
          </RoleAuthorization>
        ),
        children: [
          {
            path: `setoran`,
            element: (
              <RoleAuthorization allowRoles={["direktur","teller"]}>
                <Suspense>
                  <Setoran />
                </Suspense>
              </RoleAuthorization>
            ),
            children: [
              {
                index: true,
                element: (
                  <RoleAuthorization allowRoles={["direktur","teller"]}>
                    <Suspense>
                      <ViewSetoran />
                    </Suspense>
                  </RoleAuthorization>
                ),
              },
              {
                path: `add`,
                element: (
                  <RoleAuthorization allowRoles={["direktur","teller"]}>
                    <Suspense>
                      <AddSetoran />
                    </Suspense>
                  </RoleAuthorization>
                ),
              },
              {
                path: `edit`,
                element: (
                  <RoleAuthorization allowRoles={["direktur","teller"]}>
                    <Suspense>
                      <EditSetoran />
                    </Suspense>
                  </RoleAuthorization>
                ),
              },
            ],
          },
          {
            path: `penarikan`,
            element: (
              <RoleAuthorization allowRoles={["direktur","teller"]}>
                <Suspense>
                  <Penarikan />
                </Suspense>
              </RoleAuthorization>
            ),
            children: [
              {
                index: true,
                element: (
                  <RoleAuthorization allowRoles={["direktur","teller"]}>
                    <Suspense>
                      <ViewPenarikan />
                    </Suspense>
                  </RoleAuthorization>
                ),
              },
              {
                path: `add`,
                element: (
                  <RoleAuthorization allowRoles={["direktur","teller"]}>
                    <Suspense>
                      <AddPenarikan />
                    </Suspense>
                  </RoleAuthorization>
                ),
              },
              {
                path: `edit`,
                element: (
                  <RoleAuthorization allowRoles={["direktur","teller"]}>
                    <Suspense>
                      <EditPenarikan />
                    </Suspense>
                  </RoleAuthorization>
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
              <RoleAuthorization allowRoles={["direktur","admin"]}>
                <Suspense>
                  <PengajuanIndex />
                </Suspense>
              </RoleAuthorization>
            ),
            children: [
              {
                index: true,
                element: (
                  <RoleAuthorization allowRoles={["direktur","admin"]}>
                    <Suspense>
                      <ViewPengajuan />
                    </Suspense>
                  </RoleAuthorization>
                ),
              },
              {
                path: `add`,
                element: (
                  <RoleAuthorization allowRoles={["direktur","admin"]}>
                    <Suspense>
                      <AddPengajuan />
                    </Suspense>
                  </RoleAuthorization>
                ),
              },
              {
                path: `edit`,
                element: (
                  <RoleAuthorization allowRoles={["direktur","admin"]}>
                    <Suspense>
                      <EditPengajuan />
                    </Suspense>
                  </RoleAuthorization>
                ),
              },
              {
                path: `detail`,
                element: (
                  <RoleAuthorization allowRoles={["direktur","admin"]}>
                    <Suspense>
                      <DetailPengajuan />
                    </Suspense>
                  </RoleAuthorization>
                ),
              },
            ],
          },
          {
            path: `validasi`,
            element: (
              <RoleAuthorization allowRoles={["direktur"]}>
                <Suspense>
                  <PengajuanIndex />
                </Suspense>
              </RoleAuthorization>
            ),
            children: [
              {
                index: true,
                element: (
                  <RoleAuthorization allowRoles={["direktur"]}>
                    <Suspense>
                      <ValidasiPengajuan />
                    </Suspense>
                  </RoleAuthorization>
                ),
              },
              {
                path: `detail`,
                element: (
                  <RoleAuthorization allowRoles={["direktur"]}>
                    <Suspense>
                      <DetailValidasiPengajuan />
                    </Suspense>
                  </RoleAuthorization>
                ),
              },
            ],
          },
          {
            path: `pinjaman`,
            element: (
              <RoleAuthorization allowRoles={["direktur","teller"]}>
                <Suspense>
                  <IndexPinjaman />
                </Suspense>
              </RoleAuthorization>
            ),
            children: [
              {
                index: true,
                element: (
                  <RoleAuthorization allowRoles={["direktur","teller"]}>
                    <Suspense>
                      <ViewPinjaman />
                    </Suspense>
                  </RoleAuthorization>
                ),
              },
              {
                path: `add`,
                element: (
                  <RoleAuthorization allowRoles={["direktur","teller"]}>
                    <Suspense>
                      <AddPinjaman />
                    </Suspense>
                  </RoleAuthorization>
                ),
              },
              {
                path: `edit`,
                element: (
                  <RoleAuthorization allowRoles={["direktur","teller"]}>
                    <Suspense>
                      <EditPinjaman />
                    </Suspense>
                  </RoleAuthorization>
                ),
              },
            ],
          },
          {
            path: `angsuran`,
            element: (
              <RoleAuthorization allowRoles={["direktur","teller"]}>
                <Suspense>
                  <IndexAngsuran />
                </Suspense>
              </RoleAuthorization>
            ),
            children: [
              {
                index: true,
                element: (
                  <RoleAuthorization allowRoles={["direktur","teller"]}>
                    <Suspense>
                      <ListPinjaman />
                    </Suspense>
                  </RoleAuthorization>
                ),
              },
              {
                path: `bayar`,
                element: (
                  <RoleAuthorization allowRoles={["direktur","teller"]}>
                    <Suspense>
                      <ViewAngsuran />
                    </Suspense>
                  </RoleAuthorization>
                ),
              },
              {
                path: `bayar/form`,
                element: (
                  <RoleAuthorization allowRoles={["direktur","teller"]}>
                    <Suspense>
                      <FormAngsuran />
                    </Suspense>
                  </RoleAuthorization>
                ),
              },
              {
                path: `bayar/edit`,
                element: (
                  <RoleAuthorization allowRoles={["direktur","teller"]}>
                    <Suspense>
                      <FormEditAngsuran />
                    </Suspense>
                  </RoleAuthorization>
                ),
              },
            ],
          },
        ],
      },
      {
        path: `pelaporan`,
        element: (
          <RoleAuthorization allowRoles={["direktur","teller","admin"]}>
            <Suspense>
              <Outlet />
            </Suspense>
          </RoleAuthorization>
        ),
        children: [
          {
            path: `lapsimpanan`,
            element: (
              <RoleAuthorization allowRoles={["direktur","teller"]}>
                <Suspense>
                  <ListLapSimpanan />
                </Suspense>
              </RoleAuthorization>
            ),
          },
          {
            path: `lapsimpananperiode`,
            element: (
              <RoleAuthorization allowRoles={["direktur","teller"]}>
                <Suspense>
                  <LapPeriodeSimpanan />
                </Suspense>
              </RoleAuthorization>
            ),
          },
          {
            path: `lapsimpanan/detail`,
            element: (
              <RoleAuthorization allowRoles={["direktur","teller"]}>
                <Suspense>
                  <LapRekSimpanan />
                </Suspense>
              </RoleAuthorization>
            ),
          },
          {
            path: `lapriwayat`,
            element: (
              <RoleAuthorization allowRoles={["direktur","teller","admin"]}>
                <Suspense>
                  <ListRiwayat />
                </Suspense>
              </RoleAuthorization>
            ),
          },
          {
            path: `lapriwayat/detail`,
            element: (
              <RoleAuthorization allowRoles={["direktur","teller","admin"]}>
                <Suspense>
                  <LapRiwayat />
                </Suspense>
              </RoleAuthorization>
            ),
          },
          {
            path: `lappinjaman`,
            element: (
              <RoleAuthorization allowRoles={["direktur","teller"]}>
                <Suspense>
                  <LapPinjaman />
                </Suspense>
              </RoleAuthorization>
            ),
          },
          {
            path: `lapkas`,
            element: (
              <RoleAuthorization allowRoles={["direktur","teller"]}>
                <Suspense>
                  <LapKas />
                </Suspense>
              </RoleAuthorization>
            ),
          },
          {
            path: `lapkassimpanan`,
            element: (
              <RoleAuthorization allowRoles={["direktur","teller"]}>
                <Suspense>
                  <LapKasSimpanan />
                </Suspense>
              </RoleAuthorization>
            ),
          },
          {
            path: `lapakun`,
            element: (
              <RoleAuthorization allowRoles={["direktur","teller"]}>
                <Suspense>
                  <LapAkun />
                </Suspense>
              </RoleAuthorization>
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
    path: `/forbidden`,
    element: (
      <Suspense>
        <Forbidden />
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
