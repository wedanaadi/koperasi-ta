import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../../components/Datatable/Pagination/Pagination";
import Search from "../../components/Datatable/Search";
import { Link, useNavigate, useParams } from "react-router-dom";
import useStore from "../../store/useStore";

export default function Index() {
  const [dataApi, setDataApi] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [onSearch, setSearch] = useState("");
  const navigasi = useNavigate();
  const toastChange = useStore((state) => state.changeState);
  const toastIcon = useStore((state) => state.iconsToast);
  const toastColors = useStore((state) => state.colorsToast);

  const getData = () => {
    // let pageParse = page;
    let url = `${
      import.meta.env.VITE_BACKEND_API
    }/lamaangsuran?page=${currentPage}&perpage=${"10"}`;
    if (onSearch) {
      setCurrentPage(1);
      url += `&search=${onSearch}`;
    }
    axios.get(url).then((res) => {
      setDataApi(res.data);
    });
  };

  useEffect(() => {
    getData();
  }, [currentPage]);

  const handleEditButton = (data) => {
    localStorage.setItem("dataEdit", JSON.stringify(data));
    navigasi("edit", { replace: true });
  };

  const handleHapus = (id) => {
    let text = "Hapus data ?";
    let msg = "";
    if (confirm(text) == true) {
      axios
      .delete(`${import.meta.env.VITE_BACKEND_API}/lamaangsuran/${id}`,{})
      .then((res) => {
        getData()
        toastChange({
          id: "NotifdeleteLamaAngsuran",
          content: {
            title: "Delete Data",
            description: "Delete Lama Angsuran Successfuly",
            backgroundColor: toastColors.success,
            icon: toastIcon.check,
          },
          position: "top-right",
          dismiss: true,
          duration: 3000,
        });
      }).catch((err)=>{
        console.log(err);
      });
    } else {
      msg = "Aksi dibatalkan";
      alert(msg)
    }
  };

  return (
    <div className="bg-white card">
      <div className="border-second card-header">
        <h3 className="mb-0 text-2xl font-semibold">Lama Angsuran</h3>
        <div className="flex justify-center items-center">
          <Link to={"add"} className="btn bg-green-700 hover:opacity-80">
            Tambah
          </Link>
        </div>
      </div>
      <div className="card-body">
        <div>
          <div className="w-2/12">&nbsp;</div>
          <div className="flex flex-row-reverse w-full">
            <>
              <button className="btn2 bg-blue-700" onClick={() => getData()}>
                Cari
              </button>
              &nbsp;
              <Search
                onSearch={(value) => {
                  setSearch(value);
                }}
              />
            </>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-auto">
                <table className="min-w-full border-2 text-center text-base font-light">
                  <thead className="border-b font-medium">
                    <tr>
                      <th scope="col" className="border-r px-6 py-4 w-1/12">
                        #
                      </th>
                      <th scope="col" className="border-r px-6 py-4">
                        Lama Angsuran
                      </th>
                      <th scope="col" className="border-r px-6 py-4 w-2/12">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataApi?.data?.data.length > 0 ? (
                      dataApi?.data?.data.map((data, index) => (
                        <tr className="border-b font-medium" key={index}>
                          <td className="whitespace-nowrap border-r px-6 py-4 font-medium">
                            {index + dataApi.data.from}
                          </td>
                          <td className="whitespace-nowrap border-r px-6 py-4 text-left">
                            {data.lama_angsuran}
                          </td>
                          <td className="whitespace-nowrap border-r px-6 py-4 flex justify-center">
                            <button
                              className="btn2 bg-orange-500"
                              onClick={() => handleEditButton(data)}
                            >
                              Edit
                            </button>
                            &nbsp;
                            <button className="btn2 bg-red-500" onClick={() => handleHapus(data.id)}>Hapus</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={2}>Tidak Ada Data</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {dataApi?.data ? (
          <Pagination
            className="pagination-bar float-right mb-3"
            currentPage={currentPage}
            totalCount={dataApi.data.total}
            pageSize={dataApi.data.per_page}
            onPageChange={(page) => setCurrentPage(page)}
          />
        ) : (
          false
        )}
      </div>
    </div>
  );
}
