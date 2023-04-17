import React, { Suspense } from "react";

const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const LamaAngsuran = React.lazy(() => import("./pages/LamaAngsuran/Index"));
const AddLamaAngsuran = React.lazy(() => import("./pages/LamaAngsuran/Add"));
const EditLamaAngsuran = React.lazy(() => import("./pages/LamaAngsuran/Edit"));
const JenisSimpanan = React.lazy(() => import("./pages/JenisSimpanan/Index"));
const AddJenisSimpanan = React.lazy(() => import("./pages/JenisSimpanan/Add"));
const EditJenisSimpanan = React.lazy(() => import("./pages/JenisSimpanan/Edit"));
const Marketing = React.lazy(() => import("./pages/Marketing/Index"));
const AddMarketing = React.lazy(() => import("./pages/Marketing/Add"));
const EditMarketing = React.lazy(() => import("./pages/Marketing/Edit"));
const Akun = React.lazy(() => import("./pages/Akun/Index"));
const AddAkun = React.lazy(() => import("./pages/Akun/Add"));
const EditAkun = React.lazy(() => import("./pages/Akun/Edit"));
const Karyawan = React.lazy(() => import("./pages/Karyawan/Index"));
const AddKaryawan = React.lazy(() => import("./pages/Karyawan/Add"));
const EditKaryawan = React.lazy(() => import("./pages/Karyawan/Edit"));

export default [
  {
    path: `/`,
    element: (
      <Suspense>
        <Home />
      </Suspense>
    ),
    children : [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: `/lamaAngsuran`,
        element: (
          <Suspense>
            <LamaAngsuran />
          </Suspense>
        ),
      },
      {
        path: `/lamaAngsuran/add`,
        element: (
          <Suspense>
            <AddLamaAngsuran />
          </Suspense>
        ),
      },
      {
        path: `/lamaAngsuran/edit`,
        element: (
          <Suspense>
            <EditLamaAngsuran />
          </Suspense>
        ),
      },
      {
        path: `/jenissimpanan`,
        element: (
          <Suspense>
            <JenisSimpanan />
          </Suspense>
        ),
      },
      {
        path: `/jenissimpanan/add`,
        element: (
          <Suspense>
            <AddJenisSimpanan />
          </Suspense>
        ),
      },
      {
        path: `/jenissimpanan/edit`,
        element: (
          <Suspense>
            <EditJenisSimpanan />
          </Suspense>
        ),
      },
      {
        path: `/marketing`,
        element: (
          <Suspense>
            <Marketing />
          </Suspense>
        ),
      },
      {
        path: `/marketing/add`,
        element: (
          <Suspense>
            <AddMarketing />
          </Suspense>
        ),
      },
      {
        path: `/marketing/edit`,
        element: (
          <Suspense>
            <EditMarketing />
          </Suspense>
        ),
      },
      {
        path: `/akun`,
        element: (
          <Suspense>
            <Akun />
          </Suspense>
        ),
      },
      {
        path: `/akun/add`,
        element: (
          <Suspense>
            <AddAkun />
          </Suspense>
        ),
      },
      {
        path: `/akun/edit`,
        element: (
          <Suspense>
            <EditAkun />
          </Suspense>
        ),
      },
      {
        path: `/karyawan`,
        element: (
          <Suspense>
            <Karyawan />
          </Suspense>
        ),
      },
      {
        path: `/karyawan/add`,
        element: (
          <Suspense>
            <AddKaryawan />
          </Suspense>
        ),
      },
      {
        path: `/karyawan/edit`,
        element: (
          <Suspense>
            <EditKaryawan />
          </Suspense>
        ),
      },
    ]
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
