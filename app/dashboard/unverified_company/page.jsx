'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import axiosInstance from "@/app/utils/axiosInstance";
import Link from 'next/link'
import Pagination from "@/app/others/pagination/page";

export default function Home() {
  const [user, setUser] = useState([]);
  const [perPage, setPerPage] = useState('10');
  const [page, setPage] = useState('1');
  const [search, setSearch] = useState('');
  const [is_approved, set_is_approved] = useState(false);
  const [is_kyc_submitted, set_is_kyc_submitted] = useState(true);
  const [loading, setLoading] = useState(true); 
  const [showFilter, setShowFilter] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState()
    const [filter, setFilter] = useState('')

const handlePageChange = (page) => {
        setCurrentPage(page);
        setPage(page)
    };

  useEffect(() => {
    getUser();
  }, [perPage, search, page]);

  const getUser = async () => {
    setLoading(true);  
    //company/list/?entity_type=adf&company_type=df&is_approved=false&is_kyc_submitted=true&search=df&page=2&page_size=12
    try {
      const response = await axiosInstance.get(`company/list/?is_approved=${is_approved}&is_kyc_submitted=${is_kyc_submitted}&search=${search}&page=${page}&page_size=${perPage}`);
      setUser(response.data.results);
      console.log(response)
      setCurrentPage(response.data.current_page)
      let total = Math.floor(response.data.count / perPage)
      if(total === 1 ){
        setTotalPages(total)
      } else ( total = total + 1){
        setTotalPages(total)
      }      
      
    } catch (error) {
      console.error('Error', error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="pl-[70px] pr-4 h-screen w-screen bg-white">
      <div className="flex border p-5">
            <div className='hover:text-blue-400' >
              <Link href="/dashboard">
                <button className="h-[35px] w-[35px] rounded-md border border-slate-300 hover:border-[#309fed] text-black hover:text-[#309fed] p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5 8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>
            </Link>
          </div>
        <label className="text-[#1E1E1E] text-xl mx-4 mt-1 font-bold">Unverified Company</label>
      </div>
      <div className="p-5 flex justify-between">
        <div className="flex gap-2">

          <div className="flex gap-3 text-[#4A5568] border px-4 py-2 rounded shadow">
            <label>Created At</label>
            <div className="mt-2">
              <Image src='/dropdown.svg' alt='' width={13} height={13} />
            </div>
          </div>

       </div>
        <div className="relative flex gap-2 cursor-pointer">
          <div onClick = {() => setShowFilter(!showFilter)} className="flex gap-2 text-[#4A5568] border px-4 py-2 rounded shadow ">
            <div className="mt-1.5">
              <Image src='/filter.svg' alt='' width={15} height={13} />
            </div>
            <label className="text-[#4A5568] cursor-pointer">Filter </label>
          </div>
          {showFilter && 
          <div onClick = {() => setShowFilter(!showFilter)} className="absolute top-12 right-4 w-32 text-black bg-gray-50 rounded p-4 shadow">
            <p className="py-1 text-[14px] hover:text-[#3462B5]" onClick = {() => setFilter("Incorporation")}>Corporation</p>
           <p className="py-1 text-[14px] hover:text-[#3462B5]" onClick = {() => setFilter('organization')}>Organization</p>
          </div> }
        </div>
        
      </div>
      <div className="p-5">
        <div className="border-2 border-gray-100 rounded">
          <div className="flex justify-between p-4">
            <div className="flex justify-between border px-4 py-2 xl:w-72 w-auto rounded shadow">
              <input
                type="text"
                onChange={(e) => { setSearch(e.target.value) }}
                className="flex-grow focus:outline-none focus:border-gray-900 text-[#4A5568]"
                placeholder="Search"
              />
              <Image src='/search.svg' alt='Search Icon' width={15} height={15} />
            </div>
            <div className="text-[#4A5568] flex">
              <p>Showing</p>
              <div className="w-[57px] h-[30px] border px-2 mx-2 py-0.5 bg-[#D9D9D91A] flex justify-between">
                <select
                  className="appearance-none bg-transparent border-none text-gray-700 focus:outline-none focus:ring-0 w-full"
                  onChange={(e) => setPerPage(Number(e.target.value))}
                >
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                </select>
                <Image src='/dropdown.svg' alt='' height={10} width={10} />
              </div>
              <p>of</p>
              <div className="flex">
                <p className="px-2">50</p>
                <p>results</p>
              </div>
            </div>
          </div>

        
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="text-[#4A5568] pt-5">
              <table className="w-full border-separate border-spacing-0">
                <thead>
                  <tr className="bg-[#E5E9EB29]">
                    <th className="text-[#191D2380] text-left border py-2 px-4">S.N.</th>
                    <th className="text-[#191D2380] text-left border py-2 px-4">ENTITY NAME</th>
                    <th className="text-[#191D2380] text-left border py-2 px-4">EMAIL</th>
                    <th className="text-[#191D2380] text-left border py-2 px-4">PHONE NUMBER</th>
                    <th className="text-[#191D2380] text-left border py-2 px-4">ENTITY TYPE</th>
                    <th className="text-[#191D2380] text-left border py-2 px-4">CREATED AT</th>
                    <th className="text-[#191D2380] text-center border py-2 px-4">OPERATION</th>
                  </tr>
                </thead>

                {user.map((val, index) => (
                  <tbody key={val.id} className="w-full">
                      <tr className="cursor-pointer">
                        <td className="text-[#4A5568] text-left border py-2 px-4">{index + 1}</td>
                        <td className="text-[#4A5568] font-bold text-left border py-2 px-4">{val.entity_name}</td>
                        <td className="text-[#4A5568] text-left border py-2 px-4">{val.email}</td>
                        <td className="text-[#4A5568] text-left border py-2 px-4">{val.incorporation_number}</td>
                        <td className="text-[#4A5568] text-left border py-2 px-4">{val.entity_type}</td>
                        <td className="text-[#4A5568] text-left border py-2 px-4">{`2022`}</td>
                        <td className="text-[#4A5568] border py-2">
                        <Link href={`/dashboard/company_details/${val.id}`} className="flex justify-center">
                          <Image src='/details.png' alt = '' height={20} width={20} />
                        </Link>
                      </td>
                      </tr>
                  </tbody>
                ))}
              </table>
            </div>
            
          )}
          
        </div>
         
      </div>
      <div>
         {loading ?
            ''
            :
            <div className="flex justify-end mx-5">
            <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            handlePageChange={handlePageChange} 
            />
        </div>}
      </div>
    </div>
  );
}