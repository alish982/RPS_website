'use client'
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

export default function Home(){

  const [user, setUser] = useState([])

  useEffect(() => {
    getUser();
  }, [])

    const getUser = async () => {
    try {
      const response = await axiosInstance.get(`company/list/?page= 2 &page_size= 25`);
      setUser(response.data.results)
      console.log(response.data, 'hi')
    } catch (error) {
      console.error('Error', error);
    }
  };

  console.log(user, 'user')

  return(
    <div className="pl-[70px] pr-4 h-screen w-screen bg-white">
        <div className="border p-5">
          <label className="text-[#1E1E1E] text-xl mx-2 font-bold">Company</label>
        </div>
        <div  className="p-5 flex justify-between">
          <div className="flex gap-2">
            <div className="flex gap-3 text-[#4A5568] border px-4 py-2 rounded shadow">
              <label>is Approved </label>
              <div className="mt-2">
                <Image src =  '/dropdown.svg' alt = '' width={13} height={13} />
              </div>
            </div>

             <div className="flex gap-3 text-[#4A5568] border px-4 py-2 rounded shadow">
              <label>Created At</label>
              <div className="mt-2">
                <Image src =  '/dropdown.svg' alt = '' width={13} height={13} />
              </div>
            </div>

          </div>
           <div className="flex gap-2">
             <div className="flex gap-2 text-[#4A5568] border px-4 py-2 rounded shadow">
              <div className="mt-1.5">
                <Image src =  '/filter.svg' alt = '' width={15} height={13} />
              </div>
              <label className="text-[#4A5568]">Filter </label>
            </div>
            <Link className = "cursor-pointer" href='/form'>
                <button className="flex gap-2 bg-[#3462B5] px-4 py-2 rounded shadow ">
                  <div className="mt-1">
                    <Image src =  '/add.svg' alt = '' width={15} height={13} />
                  </div>
                  <label className="text-white font-bold">Add Company</label>     
              </button>
            </Link>
           </div>
        </div>
        <div className="p-5">
          <div className="border-2 border-gray-100 rounded">
               <div className="flex justify-between p-4">
            <div className="flex justify-between border px-4 py-2 xl:w-72 w-auto rounded shadow">
              <label className="text-[#4A5568]">Search</label>
              <Image src = '/search.svg' alt = '' width={15} height={15} />
            </div>
            <div className="text-[#4A5568]">
              Showing 9 of 50 results
            </div>
          </div>
          <div className="text-[#4A5568] pt-5">
            <table className="w-full">
              <thead>
                <tr className="bg-[#E5E9EB29">
                  <th className="text-[#191D2380] text-left border py-2 px-4 bg-[#E5E9EB29]"><input type = 'checkbox'/></th>
                  <th className="text-[#191D2380] text-left border py-2 px-4 bg-[#E5E9EB29]">ENTITY NAME</th>
                  <th className="text-[#191D2380] text-left border py-2 px-4 bg-[#E5E9EB29]">EMAIL</th>
                  <th className="text-[#191D2380] text-left border py-2 px-4 bg-[#E5E9EB29]">PHONE NUMBER</th>
                  <th className="text-[#191D2380] text-left border py-2 px-4 bg-[#E5E9EB29]">ENTITY TYPE</th>
                  <th className="text-[#191D2380] text-left border py-2 px-4 bg-[#E5E9EB29]">CREATED AT</th>
                </tr>
              </thead>
              {user.map((val) => (
              <tbody key = {val.id} className="w-full">
                <tr>
                  <td className="text-[#4A5568] text-left border py-2 px-4"><input type = 'checkbox'/></td>
                  <td className="text-[#4A5568] font-bold text-left border py-2 px-4">{val.entity_name}</td>
                  <td className="text-[#4A5568] text-left border py-2 px-4">{val.email}</td>
                  <td className="text-[#4A5568] text-left border py-2 px-4">{val.incorporation_number}</td>
                  <td className="text-[#4A5568] text-left border py-2 px-4">{val.entity_type}</td>
                  <td className="flex justify-between text-[#4A5568] border text-left py-2 px-4">
                    <label>2022</label>
                    <Image src='/statusTrue.svg' alt = '' width={20} height={20} />
                      <Image src='/statusFalse.svg' alt = '' width={20} height={20} />
                  </td>
                </tr>
              </tbody>
              ))}
            </table>
          </div>
          </div>
        </div>
    </div>
  )
}


