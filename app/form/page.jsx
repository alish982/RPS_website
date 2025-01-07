'use client'
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";


export default function KycVerify(){
  const [options, setOptions] = useState([]);
  const [userOptions, setUserOptions] = useState([])
  // const [initialvalue] = ({
  //   entity_type: ''
  // })

  useEffect(() => {
    getCompayEntityTypes();

  }, []);

  const getCompayEntityTypes = async () => {
    try {
      const response = await axiosInstance.get('company/company-entity-types');
      const options = response.data.data.map((row) => ({
        value: row.company_type,
        label: row.entity_type
      }));
      setOptions(options);
    } catch (error) {
      console.error('Error', error);
    }
  };

  return(
    <div className="pl-[70px] pr-4 bg-white">
        <div className="border p-5">
          <label className="text-[#1E1E1E] text-2xl mx-2 font-bold">Company KYC</label>
        </div>
        <div className="py-5 px-8">
          <div className="flex gap-20">
            <div className="flex flex-col">
              <label className="text-[32px] font-bold text-[#1E1E1E] text-center">01</label>
              <label className="text-[#4A5568] text-[19px] py-2">Information</label>
            </div>
            <div className="flex flex-col">
              <label className="text-[32px] text-[#4A556880] font-bold text-center">02</label>
              <label className="text-[19px] text-[#4A556880] py-2">Questionnaires</label>
            </div>
          </div>
          <div className="flex pl-9 gap-2 my-1">
            <Image src ='circle.svg' alt = '' width={20} height={20} /><label className="text-[#667085]">-------------------------------</label><Image src ='circleTick.svg' alt = '' width={20} height={20} />
          </div>
        </div>
        <div className="p-9">
          <label className="text-[21px] text-[#000000] font-bold">Company Information</label>
        </div>

        <form className="pl-8 pb-10">
          <div className="grid grid-cols-2 gap-5 pb-5 xl:w-[1200px]">

            <div className="flex flex-col w-1/3">
              <label className="text-[16px] text-[#344054] font-bold py-2">User  <span className="text-red-500">*</span></label>
              <input className="border border-[#D0D5DD] w-[548px] h-[48px] shadow px-4 rounded" type = 'text' placeholder="Select User"  />
            </div>

            <div className="flex flex-col w-1/3">
                <label className="text-[16px] text-[#344054] font-bold py-2">Entity Type <span className="text-red-500">*</span></label>
              <select className={`border border-[#D0D5DD] w-[548px] h-[48px] shadow px-4 text-[#344054] rounded`}
            >
                 {options.map((option, index) => (
                  <option key={index} value={option.value} onChange={() => formik.setFieldValue('entity_type', option.value) }>
                    {option.label}
                  </option>
                ))}
                </select>
            </div>
          
        

             <div className="flex flex-col w-1/3">
              <label className="text-[16px] text-[#344054] font-bold py-2">Entity Name <span className="text-red-500">*</span></label>
               <input className="border border-[#D0D5DD] w-[548px] h-[48px] shadow px-4 rounded" type = 'text' placeholder="Select Entify Type"  />
            </div>

             <div className="flex flex-col w-1/3">
              <label className="text-[16px] text-[#344054] font-bold py-2">Email <span className="text-red-500">*</span></label>
               <input className="border border-[#D0D5DD] w-[548px] h-[48px] shadow px-4 rounded" type = 'text' placeholder="Select Entify Type"  />
            </div>

        
            <div className="flex flex-col w-1/3">
              <label className="text-[16px] text-[#344054] font-bold py-2">Phone Number  <span className="text-red-500">*</span></label>
              <input className="border border-[#D0D5DD] w-[548px] h-[48px] shadow px-4 rounded" type = 'text' placeholder="Select User"  />
            </div>
             <div className="flex flex-col w-1/3">
              <label className="text-[16px] text-[#344054] font-bold py-2">Postal Code <span className="text-red-500">*</span></label>
               <input className="border border-[#D0D5DD] w-[548px] h-[48px] shadow px-4 rounded" type = 'text' placeholder="Select Entify Type"  />
            </div>
          

  
            <div className="flex flex-col w-1/3">
              <label className="text-[16px] text-[#344054] font-bold py-2">Prefecture  <span className="text-red-500">*</span></label>
              <input className="border border-[#D0D5DD] w-[548px] h-[48px] shadow px-4 rounded" type = 'text' placeholder="Select User"  />
            </div>
             <div className="flex flex-col w-1/3">
              <label className="text-[16px] text-[#344054] font-bold py-2">City<span className="text-red-500">*</span></label>
               <input className="border border-[#D0D5DD] w-[548px] h-[48px] shadow px-4 rounded" type = 'text' placeholder="Select Entify Type"  />
            </div>
          
   
            <div className="flex flex-col w-1/3">
              <label className="text-[16px] text-[#344054] font-bold py-2">Street  <span className="text-red-500">*</span></label>
              <input className="border border-[#D0D5DD] w-[548px] h-[48px] shadow px-4 rounded" type = 'text' placeholder="Select User"  />
            </div>

             <div className="flex flex-col w-1/3">
              <label className="text-[16px] text-[#344054] font-bold py-2">Building Name <span className="text-red-500">*</span></label>
               <input className="border border-[#D0D5DD] w-[548px] h-[48px] shadow px-4 rounded" type = 'text' placeholder="Select Entify Type"  />
            </div>

            <div className="flex flex-col w-1/3">
              <label className="text-[16px] text-[#344054] w-[548px] font-bold py-2">Representative Director First Name <span className="text-red-500">*</span></label>
              <input className="border border-[#D0D5DD] w-[548px] h-[48px] rounded shadow px-4" type = 'text' placeholder="Select User"  />
            </div>

             <div className="flex flex-col w-1/3">
              <label className="text-[16px] w-[548px] text-[#344054] font-bold py-2">Representative Director Last Name <span className="text-red-500">*</span></label>
               <input className="border border-[#D0D5DD] w-[548px] h-[48px] rounded shadow px-4" type = 'text' placeholder="Select Entify Type"  />
            </div>
     

         
            <div className="flex flex-col w-1/3">
              <label className="text-[16px] text-[#344054] font-bold py-2">Website  <span className="text-red-500">*</span></label>
              <input className="border border-[#D0D5DD] w-[548px] h-[48px] shadow px-4 rounded" type = 'text' placeholder="Select User"  />
            </div>

             <div className="flex flex-col w-1/3">
              <label className="text-[16px] text-[#344054] w-[548px] font-bold py-2">Incorporation Number <span className="text-red-500">*</span></label>
               <input className="border border-[#D0D5DD] w-[548px] h-[48px] shadow px-4 rounded" type = 'text' placeholder="Select Entify Type"  />
            </div>
         

            <div className="flex grid-2 gap-10 pb-5">
              <div className="flex flex-col w-1/3">
                <label className="text-[16px] text-[#344054] w-[548px] font-bold py-2">Company Registration Certificate <span className="text-red-500">*</span></label>
                <input className="border border-[#D0D5DD] w-[548px] h-[48px] shadow px-4 rounded" type = 'text' placeholder="Select User"  />
              </div>
            </div>
          </div>

           <Link href= '/form/form_Question' className="py-5">
              <button className="px-4 py-2 my-2 rounded text-[17px] text-[#FFFFFF] bg-[#3462B5] font-bold shadow ">Save & Continue</button>
           </Link>

        </form>
    </div>
  )
}
