'use client'
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from 'react'

import axiosInstance from "@/app/utils/axiosInstance";

export default function KycVerify(){
  const [user, setUser] = useState(null)
  const [tab, setTab]= useState('GT50')

  const [checkbox, setCheckBox] = useState({
    'GT50' : true,
    'GT25' : false,
    'GT0' : false,

  })
  const [showAddSH, setShowAddSH] = useState(false)
  
  return( 
    <div className="pl-[70px] pr-4 bg-white">
        <div className="border p-4">
          <label className="text-[#1E1E1E] text-2xl mx-2 font-bold">Company KYC</label>
        </div>
        <div className="py-4 px-8">
          <div className="flex gap-20">
            <div className="flex flex-col">
              <label className="text-[32px] font-bold text-[#1E1E1E] text-center">01</label>
              <label className="text-[#1E1E1E] text-[19px] py-2">Information</label>
            </div>
            <div className="flex flex-col">
              <label className="text-[32px] text-[#1E1E1E] font-bold text-center">02</label>
              <label className="text-[19px] text-[#1E1E1E] py-2">Questionnaires</label>
            </div>
          </div>
          <div className="flex pl-9 gap-2 my-1">
            <Image src ='/circleWithTick.svg' alt = '' width={20} height={20} /><label className="text-[#667085]">-------------------------------</label><Image src ='/circle.svg' alt = '' width={20} height={20} />
          </div>
        </div>
       <div className="pl-8 py-4 mb-2 flex gap-4">
            <div onClick={()=> 
            {setCheckBox({
              ...checkbox, ...{"GT50": !checkbox.GT50}
            }),setTab('GT50')}}  className="border flex w-[386px] h-[100px]">
                <div className="p-2 m-2">
                   <Image 
                      src = {checkbox.GT50 ? '/checked_checkbox.svg' : '/unchecked_checkbox.svg'}
                      alt = ''
                      height={38}
                      width={38}
                      />
                </div>
                
                <div className="py-2">
                    <label className="text-[#000000] text-[21px] font-bold">Has Stakeholder GT 50</label>
                    <p className="text-[#4A556880] text-[13px]"> Does the company have stakeholders owning more than 25%?</p>
                </div>
            
            </div>

           <div onClick={()=>
            {setCheckBox({
              ...checkbox, ...{"GT25": !checkbox.GT25}
            }),setTab('GT25')}} className="border flex w-[386px] h-[100px]">
                <div className="p-2 m-2">
                   <Image 
                     src = {checkbox.GT25 ? '/checked_checkbox.svg' : '/unchecked_checkbox.svg'}
                      alt = ''
                      height={38}
                      width={38}
                      />
                </div>
                <div className="py-2">
                    <label className="text-[#000000] text-[21px] font-bold">Has Stakeholder GT 25</label>
                    <p className="text-[#4A556880] text-[13px]"> Does the company have stakeholders owning more than 25%?</p>
                </div>
            
          </div>

           <div onClick={()=>
            {setCheckBox({
              ...checkbox, ...{"GT0": !checkbox.GT0}
            }),setTab('GT0')}} className="border flex w-[386px] h-[100px]">
                <div className="p-2">
                   <Image 
                     src = {checkbox.GT0 ? '/checked_checkbox.svg' : '/unchecked_checkbox.svg'}
                      alt = ''
                      height={38}
                      width={38}
                      />
                </div>
                <div className="py-2">
                    <label className="text-[#000000] text-[21px] font-bold">Has Dominant Influence</label>
                    <p className="text-[#4A556880] text-[13px]"> Does the company have domain Influence?</p>
                </div>
            
          </div>
       </div>
      
        <form className="pl-8">
          <label className="text-[21px] text-[#000000] font-bold">Dominant Influence Details</label>
          <div className="grid grid-cols-2 gap-5 mt-2 xl:w-[1200px]">
           
              <div className="flex flex-col ">
                <label className="text-[16px] text-[#344054] font-bold py-2">First Name  <span className="text-red-500">*</span></label>
                <input className="border border-[#D0D5DD] w-[548px] h-[48px] shadow px-4" type = 'text' placeholder="First Name"  />
              </div>

              <div className="flex flex-col">
                <label className="text-[16px] text-[#344054] font-bold py-2">Last Name <span className="text-red-500">*</span></label>
                <input className="border border-[#D0D5DD] h-[48px] w-[548px] shadow px-4" type = 'text' placeholder="Last Name"  />
              </div>
              
              {checkbox.GT0 === false && <div className="flex flex-col">
                <label className="text-[16px] text-[#344054] font-bold py-2">Share Ownership % <span className="text-red-500">*</span></label>
                <input className="border border-[#D0D5DD] w-[548px] h-[48px] shadow px-4" type = 'text' placeholder="Ownership %"  />
              </div>}
              
              <div className="flex flex-col">
                <label className="text-[16px] text-[#344054] font-bold py-2">Date of Birth  <span className="text-red-500">*</span></label>
                <input className="border border-[#D0D5DD] w-[548px] h-[48px] shadow px-4" type = 'text' placeholder="MM / DD / YYYY"  />
              </div>

              { tab !== 'GT50' && <div className="flex flex-col">
                <label className="text-[16px] text-[#344054] font-bold py-2">Nationality <span className="text-red-500">*</span></label>
                <input className="border border-[#D0D5DD] w-[548px] h-[48px] shadow px-4" type = 'text' placeholder="Nationality"  />
              </div>}

             { tab === 'GT50' && <div className="flex flex-col">
              <label className="text-[16px] text-[#344054] font-bold py-2">Nationality <span className="text-red-500">*</span></label>
              <input className="border border-[#D0D5DD] w-[548px] h-[48px] shadow px-4" type = 'text' placeholder="Nationality"  />
              </div>}
            
              <div className="flex flex-col">
                <label className="text-[16px] text-[#344054] font-bold py-2">Address <span className="text-red-500">*</span></label>
                <input className="border border-[#D0D5DD] w-[548px] h-[48px] shadow px-4" type = 'text' placeholder="Address"  />
              </div>
            </div>

            {showAddSH ? <div className="grid grid-cols-2 gap-5 mt-10 pt-6 xl:w-[1200px] border-t-2 ">
             
              <div className="flex flex-col ">
                <label className="text-[16px] text-[#344054] font-bold py-2">First Name  <span className="text-red-500">*</span></label>
                <input className="border border-[#D0D5DD] w-[548px] h-[48px] shadow px-4" type = 'text' placeholder="First Name"  />
              </div>
              <div className="flex flex-col">
                <label className="text-[16px] text-[#344054] font-bold py-2">Last Name <span className="text-red-500">*</span></label>
                <input className="border border-[#D0D5DD] h-[48px] w-[548px] shadow px-4" type = 'text' placeholder="Last Name"  />
              </div>
              
              {checkbox.GT0 === false && <div className="flex flex-col">
                <label className="text-[16px] text-[#344054] font-bold py-2">Share Ownership % <span className="text-red-500">*</span></label>
                <input className="border border-[#D0D5DD] w-[548px] h-[48px] shadow px-4" type = 'text' placeholder="Ownership %"  />
              </div>}
              
              <div className="flex flex-col">
                <label className="text-[16px] text-[#344054] font-bold py-2">Date of Birth  <span className="text-red-500">*</span></label>
                <input className="border border-[#D0D5DD] w-[548px] h-[48px] shadow px-4" type = 'text' placeholder="MM / DD / YYYY"  />
              </div>

              { tab !== 'GT50' && <div className="flex flex-col">
                <label className="text-[16px] text-[#344054] font-bold py-2">Nationality <span className="text-red-500">*</span></label>
                <input className="border border-[#D0D5DD] w-[548px] h-[48px] shadow px-4" type = 'text' placeholder="Nationality"  />
              </div>}

             { tab === 'GT50' && <div className="flex flex-col">
              <label className="text-[16px] text-[#344054] font-bold py-2">Nationality <span className="text-red-500">*</span></label>
              <input className="border border-[#D0D5DD] w-[548px] h-[48px] shadow px-4" type = 'text' placeholder="Nationality"  />
              </div>}
            
              <div className="flex flex-col">
                <label className="text-[16px] text-[#344054] font-bold py-2">Address <span className="text-red-500">*</span></label>
                <input className="border border-[#D0D5DD] w-[548px] h-[48px] shadow px-4" type = 'text' placeholder="Address"  />
              </div>
            </div>: ''}

            <div className="py-4">
               {(checkbox.GT50 || checkbox.GT25) && <div onClick={() => setShowAddSH(!showAddSH)}>
                <Image src = '/Addshareholder.svg' alt = '' width={201} height={36} />
            </div>}
            </div>

            <Link href= '/form' className="">
              <button className="px-4 py-2 my-2 rounded text-[17px] text-[#344054] font-bold border shadow">Back</button>
            </Link>
            <Link href= '#' className="py-5 mx-5">
              <button className="px-4 py-2 my-2 rounded text-[17px] text-[#FFFFFF] bg-[#3462B5] font-bold shadow">Sumbit KYC</button>
            </Link>
          
        </form>
    </div>
  )
}
