import {
  MdOutlineDashboard,
  MdAccountCircle,
  MdAnalytics,
  MdOutlineSettings,
  MdLogout,
} from "react-icons/md";
import {
  BsChevronDown,
  BsChatLeftText,
  BsCalendarCheck,
  BsFiles,
  BsServer,
} from "react-icons/bs";

export default [
  { title: "Dashboard", src: `/`, icon: <MdOutlineDashboard /> },
  // { title: "Inbox", src: "Chat", icon: <BsChatLeftText /> },
  // { title: "Accounts", src: "User", gap: true, icon: <MdAccountCircle /> },
  // { title: "Schedule ", src: "Calendar", icon: <BsCalendarCheck /> },
  {
    title: "Master Data",
    src: "",
    icon: <BsServer />,
    subMenus: [
      {
        title: "Karyawan",
        src: `/karyawan`,

        cName: "sub-nav",
      },
      {
        title: "Akun",
        src: `/akun`,

        cName: "sub-nav",
      },
      {
        title: "Jenis Simpanan",
        src: `/jenissimpanan`,

        cName: "sub-nav",
      },
      {
        title: "Lama Angsuran",
        src: `/lamaangsuran`,

        cName: "sub-nav",
      },
      {
        title: "Marketing",
        src: `/marketing`,

        cName: "sub-nav",
      },
    ],
  },
  // { title: "Analytics", src: "Chart", icon: <MdAnalytics /> },
  // { title: "Files ", src: "Folder", gap: true, icon: <BsFiles /> },
  // { title: "Setting", src: "Setting", icon: <MdOutlineSettings /> },
  { title: "Logout", src: "Logout", icon: <MdLogout /> },
];
