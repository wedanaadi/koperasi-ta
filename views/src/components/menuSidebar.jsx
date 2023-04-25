import {
  MdOutlineDashboard,
  MdAccountCircle,
  MdOutlineSettings,
  MdViewModule,
  MdOutlineSaveAlt,
} from "react-icons/md";
import {GiTakeMyMoney} from "react-icons/gi"
import {RiRefund2Fill} from "react-icons/ri"
import {HiClipboardDocumentList} from "react-icons/hi2"

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
        role: ['direktur','admin','teller'],
      },
      {
        label: "Lama Angsuran",
        icon: "icon",
        to: "lamaangsuran",
        role: ['direktur','admin','teller'],
      },
      {
        label: "Marketing",
        icon: "icon",
        to: "marketing",
        role: ['direktur','admin','teller'],
      },
      {
        label: "Jenis Simpanan",
        icon: "icon",
        to: "jenissimpanan",
        role: ['direktur','admin','teller'],
      },
      {
        label: "Akun",
        icon: "icon",
        to: "akun",
        role: ['direktur','admin','teller'],
      },
      {
        label: "Nasabah",
        icon: "icon",
        to: "nasabah",
        role: ['direktur','admin','teller'],
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
        role: ['direktur','admin','teller'],
      },
      {
        label: "Kas Pengeluaran",
        icon: "icon",
        to: "kaskeluar",
        role: ['direktur','admin','teller'],
      },
      {
        label: "Penyesuain Kas",
        icon: "icon",
        to: "kaspenyesuain",
        role: ['direktur','admin','teller'],
      },
    ]
  },
  {
    label: "Simpanan",
    icon: <GiTakeMyMoney/>,
    to: "/simpanan",
    gap: true,
    role: ['direktur','admin','teller'],
    children: [
      {
        label: "Setoran",
        icon: "icon",
        to: "setoran",
        role: ['direktur','admin','teller'],
      },
      {
        label: "Penarikan",
        icon: "icon",
        to: "penarikan",
        role: ['direktur','admin','teller'],
      },
    ]
  },
  {
    label: "Pinjaman",
    icon: <RiRefund2Fill/>,
    to: "/pinjaman",
    gap: true,
    role: ['direktur','admin','teller'],
    children: [
      {
        label: "Pengajuan Pinjaman",
        icon: "icon",
        to: "pengajuan",
        role: ['direktur','admin','teller'],
      },
      {
        label: "Pinjaman",
        icon: "icon",
        to: "pinjaman",
        role: ['direktur','admin','teller'],
      },
      {
        label: "Angsuran",
        icon: "icon",
        to: "angsuran",
        role: ['direktur','admin','teller'],
      },
    ]
  },
  {
    label: "Pelaporan",
    icon: <HiClipboardDocumentList/>,
    to: "/pelaporan",
    gap: true,
    role: ['direktur','admin','teller'],
    children: [
      {
        label: "Lap Riwayat Pinjaman",
        icon: "icon",
        to: "lapriwayat",
        role: ['direktur','admin','teller'],
      },
      {
        label: "Lap Rekening Simpanan",
        icon: "icon",
        to: "lapsimpanan",
        role: ['direktur','admin','teller'],
      },
      {
        label: "Lap Transaksi Pinjaman",
        icon: "icon",
        to: "lappinjaman",
        role: ['direktur','admin','teller'],
      },
      {
        label: "Lap Transaksi Kas",
        icon: "icon",
        to: "lapkas",
        role: ['direktur','admin','teller'],
      },
      {
        label: "Lap Kas Simpanan",
        icon: "icon",
        to: "lapkassimpanan",
        role: ['direktur','admin','teller'],
      },
      {
        label: "Lap Neraca",
        icon: "icon",
        to: "lapakun",
        role: ['direktur','admin','teller'],
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
        role: ['direktur','admin','teller'],
      },
      {
        label: "Sistem",
        icon: "icon",
        to: "sistem",
        role: ['direktur','admin','teller'],
      },
    ]
  },
]
