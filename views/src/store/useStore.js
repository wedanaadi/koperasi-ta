import {create} from "zustand"
import {mountStoreDevtool} from "simple-zustand-devtools"
import createAuthSlice from "./slices/createAuthSlice";
import createToastSlice from "./slices/createToastSlice";
import createNasabahSlice from "./slices/createNasabahSlice";

const useStore = create((set, get)=>({
  ...createAuthSlice(set, get),
  ...createToastSlice(set, get),
  ...createNasabahSlice(set, get)
}))

if(import.meta.env.VITE_NODE_ENV !== 'production') {
  mountStoreDevtool('StateManagement', useStore);
}

export default useStore;
