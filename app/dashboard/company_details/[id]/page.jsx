'use client'

import { useEffect, useState } from 'react';
import axiosInstance from '@/app/utils/axiosInstance';
import { useParams } from 'next/navigation';
import Link from 'next/navigation'
import { FaBuilding, FaEnvelope, FaPhone, FaGlobe, FaIdCard, FaUser, FaRegClock } from 'react-icons/fa';

const CompanyDetails = () => {
  const { id } = useParams();
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await axiosInstance.get(`company/detail/${id}/`);
        setCompanyData(response.data);
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

  return (
    <div className="container pl-16">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <div className='flex'>
          <div className='hover:text-blue-400' >
              <Link href="/dash/payment">
              <button className="h-[35px] w-[35px] rounded-md border border-slate-300 hover:border-[#309fed] text-black hover:text-[#309fed] p-2">
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
          <h1 className="text-[#1E1E1E] text-2xl mx-2 mb-4 font-bold">Company Details</h1>
        </div>
        
        
        {companyData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-center space-x-4 p-6 bg-gray-50 rounded-lg shadow-md">
              <FaBuilding className="text-3xl text-blue-500" />
              <div>
                <h2 className="text-lg font-semibold text-[#3462B5]">Company Name</h2>
                <p className="text-sm text-gray-700">{companyData.entity_name}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-6 bg-gray-50 rounded-lg shadow-md">
              <FaIdCard className="text-3xl text-green-600" />
              <div>
                <h2 className="text-lg font-semibold text-[#3462B5]">Company Type</h2>
                <p className="text-sm text-gray-700">{companyData.company_type}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-6 bg-gray-50 rounded-lg shadow-md">
              <FaBuilding className="text-3xl text-purple-600" />
              <div>
                <h2 className="text-lg font-semibold text-[#3462B5]">Entity Type</h2>
                <p className="text-sm text-gray-700">{companyData.entity_type}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-6 bg-gray-50 rounded-lg shadow-md">
              <FaIdCard className="text-3xl text-orange-600" />
              <div>
                <h2 className="text-lg font-semibold text-[#3462B5]">Incorporation Number</h2>
                <p className="text-sm text-gray-700">{companyData.incorporation_number}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-6 bg-gray-50 rounded-lg shadow-md">
              <FaEnvelope className="text-3xl text-yellow-600" />
              <div>
                <h2 className="text-lg font-semibold text-[#3462B5]">Email</h2>
                <p className="text-sm text-gray-700">{companyData.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-6 bg-gray-50 rounded-lg shadow-md">
              <FaPhone className="text-3xl text-red-600" />
              <div>
                <h2 className="text-lg font-semibold text-[#3462B5]">Phone Number</h2>
                <p className="text-sm text-gray-700">{companyData.phone_number}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-6 bg-gray-50 rounded-lg shadow-md">
              <FaIdCard className="text-3xl text-pink-600" />
              <div>
                <h2 className="text-lg font-semibold text-[#3462B5]">Company Registration Certificate</h2>
                <a
                  href={companyData.company_registration_certificate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:underline"
                >
                  View Certificate
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-6 bg-gray-50 rounded-lg shadow-md">
              <FaGlobe className="text-3xl text-indigo-600" />
              <div>
                <h2 className="text-lg font-semibold text-[#3462B5]">Website</h2>
                <a
                  href={`https://${companyData.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:underline"
                >
                  {companyData.website}
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-6 bg-gray-50 rounded-lg shadow-md">
              <FaBuilding className="text-3xl text-teal-600" />
              <div>
                <h2 className="text-lg font-semibold text-[#3462B5]">Address</h2>
                <p className="text-sm text-gray-700">
                  {companyData.street}, {companyData.building_name && companyData.building_name + ', '} {companyData.city}, {companyData.prefecture} {companyData.postal_code}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-6 bg-gray-50 rounded-lg shadow-md">
              <FaRegClock className="text-3xl text-gray-600" />
              <div>
                <h2 className="text-lg font-semibold text-[#3462B5]">Created At</h2>
                <p className="text-sm text-gray-700">{new Date(companyData.created_at).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-6 bg-gray-50 rounded-lg shadow-md">
              <FaRegClock className="text-3xl text-gray-700" />
              <div>
                <h2 className="text-lg font-semibold text-[#3462B5]">Last Updated</h2>
                <p className="text-sm text-gray-700">{new Date(companyData.updated_at).toLocaleDateString()}</p>
              </div>
            </div>

            {companyData.representative_director && (
              <div className="flex items-center space-x-4 p-6 bg-gray-50 rounded-lg shadow-md">
                <FaUser className="text-3xl text-purple-700" />
                <div>
                  <h2 className="text-lg font-semibold text-[#3462B5]">Representative Director</h2>
                  <p className="text-sm text-gray-700">
                    {companyData.representative_director_first_name} {companyData.representative_director_last_name}
                  </p>
                </div>
              </div>
            )}

            {companyData.dominant_influence !== null && (
              <div className="flex items-center space-x-4 p-6 bg-gray-50 rounded-lg shadow-md">
                <FaUser className="text-3xl text-green-500" />
                <div>
                  <h2 className="text-lg font-semibold text-[#3462B5]">Dominant Influence</h2>
                  <p className="text-sm text-gray-700">{companyData.dominant_influence ? 'Yes' : 'No'}</p>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-4 p-6 bg-gray-50 rounded-lg shadow-md">
              <FaUser className="text-3xl text-teal-500" />
              <div>
                <h2 className="text-lg font-semibold text-[#3462B5]">Stakeholder %</h2>
                <p className="text-sm text-gray-700">{companyData.has_stakeholder_gt_25 ? '25%' : '50%'}</p>
              </div>
            </div>

          </div>
        ) : (
          <p className="text-center text-gray-600">No company data available</p>
        )}
      </div>
    </div>
  );
};

export default CompanyDetails;
