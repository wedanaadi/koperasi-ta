import {
  MdOutlineDashboard,
  MdAccountCircle,
  MdAnalytics,
  MdOutlineSettings,
  MdLogout,
  MdViewModule,
  MdOutlineSaveAlt,
} from "react-icons/md";

export default [
  {
    label: "Dashboard",
    icon: <MdOutlineDashboard/>,
    to: "/",
    role: ['direktur','admin','teller']
  },
  {
    label: "Master Data",
    icon: <MdViewModule/>,
    to: "/masterdata",
    gap: true,
    role: ['direktur','admin','teller'],
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
    label: "Transaksi Kas",
    icon: <MdAccountCircle/>,
    to: "/transaksikas",
    gap: true,
    role: ['direktur','admin','teller'],
    children: [
      {
        label: "Kas Pemasukan",
        icon: "icon",
        to: "kasmasuk",
      },
      {
        label: "Kas Pengeluaran",
        icon: "icon",
        to: "kaskeluar",
      },
      {
        label: "Penyesuain Kas",
        icon: "icon",
        to: "kaspenyesuain",
      },
    ]
  },
  {
    label: "Simpanan",
    icon: <MdOutlineSaveAlt/>,
    to: "/simpanan",
    gap: true,
    role: ['direktur','admin','teller'],
    children: [
      {
        label: "Setoran",
        icon: "icon",
        to: "setoran",
      },
      {
        label: "Penarikan",
        icon: "icon",
        to: "penarikan",
      },
    ]
  },
  {
    label: "Pinjaman",
    icon: <MdOutlineSaveAlt/>,
    to: "/pinjaman",
    gap: true,
    role: ['direktur','admin','teller'],
    children: [
      {
        label: "Pengajuan Pinjaman",
        icon: "icon",
        to: "pengajuan",
      },
      {
        label: "Pinjaman",
        icon: "icon",
        to: "pinjaman",
      },
    ]
  },
  {
    label: "Setting",
    icon: <MdOutlineSettings/>,
    to: "/setting",
    gap: true,
    role: ['direktur','admin','teller'],
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
