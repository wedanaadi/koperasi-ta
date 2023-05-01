export const ConvertToEpoch = (date) => {
  let dateProps = new Date(date);
  let myDate = new Date(dateProps * 1000);
  const myEpoch = myDate.getTime() / 1000.0;
  return myEpoch;
};

export const ToDate2 = (date) => {
  // let dateProps = new Date(date);
  // return dateProps.toLocaleDateString();

  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  // return [year, month, day].join("-");
  return [day, month, year].join("/");
};

export const DateIndo = (date) => {
  const hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const bulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  let dateProps = new Date(date);
  let tanggal = dateProps.getDate();
  let xhari = dateProps.getDay();
  let xbulan = dateProps.getMonth();
  let xtahun = dateProps.getYear();

  let hari1 = hari[xhari];
  let bulan1 = bulan[xbulan];
  let tahun1 = xtahun < 1000 ? xtahun + 1900 : xtahun;

  return hari1 + ", " + tanggal + " " + bulan1 + " " + tahun1;
};

export default function ToDate(date, type) {
  const convertDate = (dateProps, aksi) => {
    let date = new Date(dateProps);

    return aksi == "full"
      ? date
          .toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          })
          .toString()
      : date
          .toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
          .toString();
  };

  return convertDate(date, type);
}
