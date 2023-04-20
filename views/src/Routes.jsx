import React, { Suspense } from "react";
import { RequiredLogin } from "./components/MiddlewareAuth";

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
