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
    role: ['direktur','teller'],
    children: [
      {
        label: "Karyawan",
        icon: "icon",
        to: "karyawan",
        role: ['direktur'],
      },
      {
        label: "Lama Angsuran",
        icon: "icon",
        to: "lamaangsuran",
        role: ['direktur'],
      },
      {
        label: "Marketing",
        icon: "icon",
        to: "marketing",
        role: ['direktur'],
      },
      {
        label: "Jenis Simpanan",
        icon: "icon",
        to: "jenissimpanan",
        role: ['direktur'],
      },
      {
        label: "Akun",
        icon: "icon",
        to: "akun",
        role: ['direktur'],
      },
      {
        label: "Nasabah",
        icon: "icon",
        to: "nasabah",
        role: ['direktur','teller'],
      },
    ]
  },
  {
    label: "Transaksi Kas",
    icon: <MdAccountCircle/>,
    to: "/transaksikas",
    gap: true,
    role: ['direktur','teller'],
    children: [
      {
        label: "Kas Pemasukan",
        icon: "icon",
        to: "kasmasuk",
        role: ['direktur','teller'],
      },
      {
        label: "Kas Pengeluaran",
        icon: "icon",
        to: "kaskeluar",
        role: ['direktur','teller'],
      },
      {
        label: "Penyesuain Kas",
        icon: "icon",
        to: "kaspenyesuain",
        role: ['direktur','teller'],
      },
    ]
  },
  {
    label: "Simpanan",
    icon: <GiTakeMyMoney/>,
    to: "/simpanan",
    gap: true,
    role: ['direktur','teller'],
    children: [
      {
        label: "Setoran",
        icon: "icon",
        to: "setoran",
        role: ['direktur','teller'],
      },
      {
        label: "Penarikan",
        icon: "icon",
        to: "penarikan",
        role: ['direktur','teller'],
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
        role: ['admin'],
      },
      {
        label: "Validasi Pengajuan Pinjaman",
        icon: "icon",
        to: "validasi",
        role: ['direktur'],
      },
      {
        label: "Pinjaman",
        icon: "icon",
        to: "pinjaman",
        role: ['direktur','teller'],
      },
      {
        label: "Angsuran",
        icon: "icon",
        to: "angsuran",
        role: ['direktur','teller'],
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
        role: ['direktur','teller'],
      },
      {
        label: "Lap Transaksi Pinjaman",
        icon: "icon",
        to: "lappinjaman",
        role: ['direktur','teller'],
      },
      {
        label: "Lap Transaksi Kas",
        icon: "icon",
        to: "lapkas",
        role: ['direktur','teller'],
      },
      {
        label: "Lap Kas Simpanan",
        icon: "icon",
        to: "lapkassimpanan",
        role: ['direktur','teller'],
      },
      {
        label: "Lap Neraca",
        icon: "icon",
        to: "lapakun",
        role: ['direktur','teller'],
      },
      {
        label: "Lap Transaksi Simpanan",
        icon: "icon",
        to: "lapsimpananperiode",
        role: ['direktur','teller'],
      },
    ]
  },
  {
    label: "Setting",
    icon: <MdOutlineSettings/>,
    to: "/setting",
    gap: true,
    role: ['direktur'],
    children: [
      {
        label: "Biaya Administrasi",
        icon: "icon",
        to: "biayaadmin",
        role: ['direktur'],
      },
      {
        label: "Sistem",
        icon: "icon",
        to: "sistem",
        role: ['direktur'],
      },
    ]
  },
]
