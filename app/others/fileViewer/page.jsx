import React from 'react';

const FileViewer = ({ companyData }) => {
  // Check if the file is an image
  const isImage = /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(companyData.company_registration_certificate);
  const isPdfOrDoc = /\.(pdf|docx?|doc)$/i.test(companyData.company_registration_certificate);
  console.log(isImage, 'image')

  return (
    <div className="p-6 bg-gray-50 rounded-md">
      <h2 className="text-xl font-semibold text-[#3462B5]">Company Registration Certificate</h2>
      {console.log(companyData.company_registration_certificate, 'Certificate URL')}
      {isImage ? (
        // If it's an image, show it
        <img 
          src={companyData.company_registration_certificate} 
          alt="Company Registration Certificate" 
          className="mt-4 rounded-md max-w-full h-auto"
        />
      ) : isPdfOrDoc ? (
        // If it's a PDF or DOC, provide a link to open it in a new tab
        <a
          href={companyData.company_registration_certificate}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg text-blue-500 hover:underline mt-4"
        >
          View Certificate
        </a>
      ) : (
        <p className="text-red-500 mt-4">Unsupported file type</p>
      )}
    </div>
  );
};

export default FileViewer;
