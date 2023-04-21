import React from 'react'
import { DateIndo } from '../../components/Date'
import useStore from "../../store/useStore"

export default function Menubar() {
  const dataSetting = useStore((state)=>state.dataSetting)
  return (
    <div className='bg-second w-full flex justify-between shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'>
      <div className='mt-4 pb-5 ml-auto px-2'>
        <h1 className='text-slate-700 font-medium'>{dataSetting?.lokasi ? dataSetting.lokasi : 'Bali'}, {DateIndo(new Date())}</h1>
      </div>
    </div>
  )
}
