'use client'
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

export default function Home() {

  const [user, setUser] = useState([]);
  const [perPage, setPerPage] = useState('10');
  const [page, setPage] = useState('1');
  const [search, setSearch] = useState('');
  const [is_approved, set_is_approved] = useState('');
  const [is_kyc_submitted, set_is_kyc_submitted] = useState('');
  const [loading, setLoading] = useState(true);  // Add loading state

  useEffect(() => {
    getUser();
  }, [perPage, search]);

  const getUser = async () => {
    setLoading(true);  // Set loading to true before fetching data
    try {
      const response = await axiosInstance.get(`company/list/?is_approved=${is_approved}&is_kyc_submitted=${is_kyc_submitted}&search=${search}&page=${page}&page_size=${perPage}`);
      console.log(response);
      setUser(response.data.results);
    } catch (error) {
      console.error('Error', error);
    } finally {
      setLoading(false);  // Set loading to false once data is fetched
    }
  };

  return (
    <div className="pl-[70px] pr-4 h-screen w-screen bg-white">
      <div className="border p-5">
        <label className="text-[#1E1E1E] text-xl mx-2 font-bold">Company</label>
      </div>
      <div className="p-5 flex justify-between">
        <div className="flex gap-2">
          <div className="flex gap-3 text-[#4A5568] border px-4 py-2 rounded shadow">
            <label>is Approved </label>
            <div className="mt-2">
              <Image src='/dropdown.svg' alt='' width={13} height={13} />
            </div>
          </div>

          <div className="flex gap-3 text-[#4A5568] border px-4 py-2 rounded shadow">
            <label>Created At</label>
            <div className="mt-2">
              <Image src='/dropdown.svg' alt='' width={13} height={13} />
            </div>
          </div>

        </div>
        <div className="flex gap-2">
          <Link href='/dashboard/unverified_company' className="flex gap-2 text-[#4A5568] border px-4 py-2 rounded shadow">
            <div className="">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5" style={{ color: '#3462B5' }}>
                <path d="M18 1.5c2.9 0 5.25 2.35 5.25 5.25v3.75a.75.75 0 0 1-1.5 0V6.75a3.75 3.75 0 1 0-7.5 0v3a3 3 0 0 1 3 3v6.75a3 3 0 0 1-3 3H3.75a3 3 0 0 1-3-3v-6.75a3 3 0 0 1 3-3h9v-3c0-2.9 2.35-5.25 5.25-5.25Z" />
              </svg>
            </div>
            <label className="text-[#4A5568]">UnVerified Company </label>
          </Link>
          <div className="flex gap-2 text-[#4A5568] border px-4 py-2 rounded shadow">
            <div className="mt-1.5">
              <Image src='/filter.svg' alt='' width={15} height={13} />
            </div>
            <label className="text-[#4A5568]">Filter </label>
          </div>
          <Link className="cursor-pointer" href='/form'>
            <button className="flex gap-2 bg-[#3462B5] px-4 py-2 rounded shadow ">
              <div className="mt-1">
                <Image src='/add.svg' alt='' width={15} height={13} />
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

          {/* Loader and Table */}
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="text-[#4A5568] pt-5">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#E5E9EB29]">
                    <th className="text-[#191D2380] text-left border py-2 px-4"><input type='checkbox' /></th>
                    <th className="text-[#191D2380] text-left border py-2 px-4">ENTITY NAME</th>
                    <th className="text-[#191D2380] text-left border py-2 px-4">EMAIL</th>
                    <th className="text-[#191D2380] text-left border py-2 px-4">PHONE NUMBER</th>
                    <th className="text-[#191D2380] text-left border py-2 px-4">ENTITY TYPE</th>
                    <th className="text-[#191D2380] text-left border py-2 px-4">CREATED AT</th>
                  </tr>
                </thead>

                {user.map((val) => (
                  <tbody key={val.id} className="w-full">
                    <tr>
                      <td className="text-[#4A5568] text-left border py-2 px-4"><input type='checkbox' /></td>
                      <td className="text-[#4A5568] font-bold text-left border py-2 px-4">{val.entity_name}</td>
                      <td className="text-[#4A5568] text-left border py-2 px-4">{val.email}</td>
                      <td className="text-[#4A5568] text-left border py-2 px-4">{val.incorporation_number}</td>
                      <td className="text-[#4A5568] text-left border py-2 px-4">{val.entity_type}</td>
                      <td className="flex justify-between text-[#4A5568] border text-left py-2 px-4">
                        <label>2022</label>
                        <Image src='/statusTrue.svg' alt='' width={20} height={20} />
                        <Image src='/statusFalse.svg' alt='' width={20} height={20} />
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
