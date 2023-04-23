const createNasabahSlice = (set, get) => ({
  nasabah: [],
  biayaAdministrasi: [],
  setDataNasabah: async (data) => {
    set({
      nasabah: data.nasabah,
      biayaAdministrasi: data.administrasi,
    });
  },
});

export default createNasabahSlice;
