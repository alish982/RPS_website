'use client';

import { useEffect, useState } from 'react';
import axiosInstance from '@/app/utils/axiosInstance';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { usePreviousUrl } from '@/app/others/prevURL/page';

const CompanyDetails = () => {
  const { id } = useParams();
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingApprove, setLoadingApprove] = useState(false);
  const [handleConfirm, setHandleConfirm] = useState(false);
  const [checkIsApproved, setCheckISApprove] = useState('')
  const [kycSubmitted, setKycSubmitted] = useState('')

  const { previousUrl } = usePreviousUrl();

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await axiosInstance.get(`company/detail/${id}/`);
        setCompanyData(response.data);
        setCheckISApprove(response.data.is_approved)
        setKycSubmitted(response.data.is_kyc_submitted)
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCompanyDetails();
    }
  }, [id]);

  const router = useRouter();

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }


  const handleCompanyApprove = async () => {
    try {
      setLoadingApprove(true);
      const response = await axiosInstance.patch(`company/${id}/approve`);
    
      if (response.status === 200) {
        toast.success('Customer Approved');
        router.push('/dashboard/verified_company');
      }
    } catch (error) {
      setError('Failed to approve company');
      console.error(error);
    } finally {
      setLoadingApprove(false);
    }
  };

  return (
    <div className="container pl-16">
      <div className="bg-white rounded-lg p-8">
        <div className="flex mb-2">
          <div className="hover:text-blue-400">
            <Link href = {`${previousUrl}`}>
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
          <h1 className="text-[#1E1E1E] text-xl mx-4 mb-4 font-bold">Company Details</h1>
        </div>
      
        {companyData ? (
          <div key = {companyData.id} className="md:grid-cols-2 gap-8">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-6 bg-gray-50 rounded-md">
                <h2 className="text-xl font-semibold text-[#3462B5]">Company Name</h2>
                <p className="text-lg text-gray-700">{companyData.entity_name}</p>
              </div>

              <div className="p-6 bg-gray-50 rounded-md">
                <h2 className="text-xl font-semibold text-[#3462B5]">Company Type</h2>
                <p className="text-lg text-gray-700">{companyData.company_type}</p>
              </div>

              {companyData.representative_director_first_name && (
                <div className="p-6 bg-gray-50 rounded-md">
                  <h2 className="text-xl font-semibold text-[#3462B5]">Representative Director</h2>
                  <p className="text-lg text-gray-700">
                    {companyData.representative_director_first_name} {companyData.representative_director_last_name}
                  </p>
                </div>
              )}

              <div className="p-6 bg-gray-50 rounded-md">
                <h2 className="text-xl font-semibold text-[#3462B5]">Entity Type</h2>
                <p className="text-lg text-gray-700">{companyData.entity_type}</p>
              </div>

              <div className="p-6 bg-gray-50 rounded-md">
                <h2 className="text-xl font-semibold text-[#3462B5]">Incorporation Number</h2>
                <p className="text-lg text-gray-700">{companyData.incorporation_number}</p>
              </div>

              <div className="p-6 bg-gray-50 rounded-md">
                <h2 className="text-xl font-semibold text-[#3462B5]">Email</h2>
                <p className="text-lg text-gray-700">{companyData.email}</p>
              </div>

              <div className="p-6 bg-gray-50 rounded-md">
                <h2 className="text-xl font-semibold text-[#3462B5]">Phone Number</h2>
                <p className="text-lg text-gray-700">{companyData.phone_number}</p>
              </div>

              <div className="p-6 bg-gray-50 rounded-md">
                <h2 className="text-xl font-semibold text-[#3462B5]">Address</h2>
                <p className="text-lg text-gray-700">
                  {companyData.street}, {companyData.building_name && companyData.building_name + ', '} {companyData.city},{' '}
                  {companyData.prefecture} {companyData.postal_code}
                </p>
              </div>

              <div className="p-6 bg-gray-50 rounded-md">
                <h2 className="text-xl font-semibold text-[#3462B5]">Created At</h2>
                <p className="text-lg text-gray-700">{new Date(companyData.created_at).toLocaleDateString()}</p>
              </div>

              <div className="p-6 bg-gray-50 rounded-md">
                <h2 className="text-xl font-semibold text-[#3462B5]">Last Updated</h2>
                <p className="text-lg text-gray-700">{new Date(companyData.updated_at).toLocaleDateString()}</p>
              </div>

              <div className="p-6 bg-gray-50 rounded-md">
                <h2 className="text-xl font-semibold text-[#3462B5]">Website</h2>
                <a
                  href={`https://${companyData.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-blue-500 hover:underline"
                >
                  {companyData.website}
                </a>
              </div>

               {companyData.has_dominant_influence === null ? (
                <div className="p-6 bg-gray-50 rounded-md">
                  <h2 className="text-xl font-semibold text-[#3462B5]">Dominant Influence</h2>
                  <p className="text-lg text-gray-700">{companyData.dominant_influence ? 'Yes' : 'No'}</p>
                </div>
              ) : (
                ''
              )}
            </div>

            <div className="py-5">
              <label className="text-[#1E1E1E] text-xl font-bold">Company Documents</label>
            </div>

            <div className="p-6 bg-gray-50 rounded-md">
              <h2 className="text-xl font-semibold text-[#3462B5]">Company Registration Certificate</h2>
              <a
                href={companyData.company_registration_certificate}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-blue-500 hover:underline"
              >
                View Certificate
              </a>
            </div>
            {/* <FileViewer companyData={companyData} /> */}
          </div>
        ) : (
          <p className="text-center text-gray-600">No company data available</p>
        )}

            {companyData.dominant_influence && <div className="py-5">
            <label className="text-[#1E1E1E] text-xl font-bold">Dominant Influence</label>
            </div>}

            {companyData.dominant_influence ? 
              <div > 
                <div className="grid grid-cols-5 gap-4 mb-4">
                  <div className="p-6 bg-gray-50 rounded-md">
                    <h2 className="text-xl font-semibold text-[#3462B5]">Name</h2>
                    <p className="text-lg text-gray-700">{companyData.dominant_influence.first_name} {companyData.dominant_influence.last_name}</p>
                  </div>
                  <div className="p-6 bg-gray-50 rounded-md">
                    <h2 className="text-xl font-semibold text-[#3462B5]">Date Of Birth</h2>
                    <p className="text-lg text-gray-700">{companyData.dominant_influence.dob}</p>
                  </div>
                  <div className="p-6 bg-gray-50 rounded-md">
                    <h2 className="text-xl font-semibold text-[#3462B5]">Nationality</h2>
                    <p className="text-lg text-gray-700">{companyData.dominant_influence.nationality}</p>
                  </div>

                  <div className="p-6 bg-gray-50 rounded-md">
                    <h2 className="text-xl font-semibold text-[#3462B5]">Address</h2>
                    <p className="text-lg text-gray-700">{companyData.dominant_influence.address} %</p>
                  </div>
                </div>
              </div>
             : ''}


           {companyData.shareholders.length > 0 && <div className="py-5">
              <label className="text-[#1E1E1E] text-xl font-bold">Shareholders Details</label>
            </div>}

          {companyData.shareholders.length > 0 ? companyData.shareholders.map((val, index) => (
          <div key={index}> 
            <div className="grid grid-cols-5 gap-4 mb-4">
              <div className="p-6 bg-gray-50 rounded-md">
                <h2 className="text-xl font-semibold text-[#3462B5]">Name</h2>
                <p className="text-lg text-gray-700">{val.first_name} {val.last_name}</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-md">
                <h2 className="text-xl font-semibold text-[#3462B5]">Date Of Birth</h2>
                <p className="text-lg text-gray-700">{val.dob}</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-md">
                <h2 className="text-xl font-semibold text-[#3462B5]">Nationality</h2>
                <p className="text-lg text-gray-700">{val.nationality}</p>
              </div>

              <div className="p-6 bg-gray-50 rounded-md">
                <h2 className="text-xl font-semibold text-[#3462B5]">Stakeholder %</h2>
                <p className="text-lg text-gray-700">{val.share_ownership} %</p>
              </div>

               <div className="p-6 bg-gray-50 rounded-md">
                <h2 className="text-xl font-semibold text-[#3462B5]">Address</h2>
                <p className="text-lg text-gray-700">{val.address} </p>
              </div>
            </div>
          </div>
        )) : ''}

            {companyData.representative_director && <div className="py-5">
              <label className="text-[#1E1E1E] text-xl font-bold">Representative Details</label>
            </div>}

          {companyData.representative_director ? 
          <div> 
            <div className="grid grid-cols-5 gap-4 mb-4">
              <div className="p-6 bg-gray-50 rounded-md">
                <h2 className="text-xl font-semibold text-[#3462B5]">Name</h2>
                <p className="text-lg text-gray-700">{companyData.representative_director.first_name} {companyData.representative_director.last_name}</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-md">
                <h2 className="text-xl font-semibold text-[#3462B5]">Date Of Birth</h2>
                <p className="text-lg text-gray-700">{companyData.representative_director.dob}</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-md">
                <h2 className="text-xl font-semibold text-[#3462B5]">Nationality</h2>
                <p className="text-lg text-gray-700">{companyData.representative_director.nationality}</p>
              </div>

               <div className="p-6 bg-gray-50 rounded-md">
                <h2 className="text-xl font-semibold text-[#3462B5]">Address</h2>
                <p className="text-lg text-gray-700">{companyData.representative_director.address} </p>
              </div>
            </div>
          </div>
         : ''}

        <div className='pt-4'>
              {!kycSubmitted ? <div className=' py-3 px-4 bg-red-100 text-red-400 rounded'>The company KYC has not been submitted yet. Kindly assist the customer in completing the company KYC submission.</div> : <div></div>}
        </div>
        
{
  !kycSubmitted || checkIsApproved ? (
   <Link href = {`${previousUrl}`}>
      <button className="text-white bg-[#3462B5] py-4 text-lg font-bold px-10 my-5 rounded-lg">
        Back
      </button>
    </Link>
  ) : (
    <div className="flex space-x-4">
           <Link href = {`${previousUrl}`}>
        <button className="text-white bg-[#3462B5] py-4 text-lg font-bold px-10 my-5 rounded-lg">
          Back
        </button>
      </Link>
      <button
        onClick={() => setHandleConfirm((prev) => !prev)}
        className="text-white bg-green-500 py-4 text-lg font-bold px-10 my-5 rounded-lg"
      >
        Approve
      </button>
   
    </div>
  )
}

      </div>

      {handleConfirm ? (
        <div>
          <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
            <div className="relative bg-white shadow-xl rounded-lg p-8 text-center w-80">
              <div className='absolute top-2 right-3 cursor-pointer'  onClick={() => setHandleConfirm(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </div>
              <p className="text-xl font-semibold mb-4 text-black">Are you sure to approve this company?</p>
              {loadingApprove ? (
                <div className="flex justify-center items-center mt-20">
                  <div className="w-10 h-10 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="flex justify-center space-x-4">
                 
                  <button
                    onClick={() => setHandleConfirm(false)}
                    className="px-10 font-bold py-3 bg-red-500 text-white rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>

                   <button
                    onClick={handleCompanyApprove}
                    className="px-10 py-3 font-bold bg-green-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Confirm
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default CompanyDetails;


