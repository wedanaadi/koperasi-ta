import {
  MdOutlineDashboard,
  MdAccountCircle,
  MdAnalytics,
  MdOutlineSettings,
  MdLogout,
  MdViewModule,
} from "react-icons/md";

export default [
  {
    label: "Dashboard",
    icon: <MdOutlineDashboard/>,
    to: "/",
  },
  {
    label: "Master Data",
    icon: <MdViewModule/>,
    to: "/masterdata",
    gap: true,
    children: [
      {
        label: "Karyawan",
        icon: "icon",
        to: "karyawan",
      },
      {
        label: "Lama Angsuran",
        icon: "icon",
        to: "lamaangsuran",
      },
      {
        label: "Marketing",
        icon: "icon",
        to: "marketing",
      },
      {
        label: "Jenis Simpanan",
        icon: "icon",
        to: "jenissimpanan",
      },
      {
        label: "Akun",
        icon: "icon",
        to: "akun",
      },
      {
        label: "Nasabah",
        icon: "icon",
        to: "nasabah",
      },
    ]
  },
  {
    label: "Setting",
    icon: <MdOutlineSettings/>,
    to: "/setting",
    gap: true,
    children: [
      {
        label: "Biaya Administrasi",
        icon: "icon",
        to: "biayaadmin",
      },
      {
        label: "Sistem",
        icon: "icon",
        to: "sistem",
      },
    ]
  },
]
