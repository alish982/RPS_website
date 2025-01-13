// 'use client'
// import Image from "next/image"
// import { useFormik } from 'formik'
// import axiosInstance from "./utils/axiosInstance"
// import { useRouter } from "next/navigation"
// import Cookies from 'js-cookie';

// export default function Login() {

//   const router = useRouter()
//   const validate = values => {
//     const errors = {}

//     if (!values.email) {
//       errors.email = 'Required'
//     } else if (
//       !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
//     ) {
//       errors.email = 'Invalid email address'
//     }


//     if (!values.password) {
//       errors.password = "Required";
//     } else if (values.password.length < 5) {
//       errors.password = "Password must be more than 5 characters";
//     }

//     return errors;
//   }

//   const formik = useFormik({
//     initialValues: {
//       email: '',
//       password: '',
//       firebase_token:'',
//       last_login_gps: '',
//       device_id: ''
//     },
//     validate,
//     onSubmit: async (values) => {
//       const data = {
//         email: values.email,
//         password: values.password,
//         firebase_token: '',
//         last_login_gps: '', 
//         device_id: '23'
//       }

//  try {
//     const response = await axiosInstance.post('login/', data);

//     console.log('Success:', response);

//     if (response.status === 200) {
      
//       Cookies.set('access_token', response.data.data.access_token, {
//         expires: 7,  
//         path: '/',   
//         secure: true,
//         sameSite: 'Strict', 
//       });

//       router.push('/dashboard');
//     } else {
//       console.log('Error: Login failed');
//     }
//   } catch (error) {
//     console.error('Error:', error);
//   }
//     }
//   })

//   return (
//     <div className="flex">
//       <div className="relative h-screen w-2/3">
//         <div className="p-5">
//           <Image src="/logo.svg" alt="" height={200} width={200} />
//         </div>
//         <form onSubmit={formik.handleSubmit} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//           <div>
//             <div>
//               <label className="text-[52px] text-[#090914] font-bold">Login</label>
//               <p className="text-[20px] text-[#090914] opacity-60">Please fill your details to access your account</p>
//             </div>

//             <div className="py-5 flex flex-col">
//               <label className="py-2 text-[#090914CC]">Email</label>
//               <input
//                 name='email'
//                 className='border border-[#CBD5E1] rounded-lg h-[60px] w-[526px] px-4 text-[#090914CC]'
//                 type='text'
//                 placeholder="Enter your email"
//                 value={formik.values.email}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//               />
//               {formik.touched.email && formik.errors.email && (
//                 <div className="text-red-500 text-xs">{formik.errors.email}</div>
//               )}
//             </div>

//             <div className="flex flex-col">
//               <label className="py-2 text-[#090914CC]">Password</label>
//               <input
//                 name='password'
//                 className='border border-[#CBD5E1] rounded-lg h-[60px] w-[526px] px-4 text-[#090914CC]'
//                 type='password'
//                 placeholder="Enter your password"
//                 value={formik.values.password}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//               />
//               {formik.touched.password && formik.errors.password && (
//                 <div className="text-red-500 text-xs">{formik.errors.password}</div>
//               )}
//             </div>

//             <div className="flex justify-between mt-4">
//               <div className="flex gap-3">
//                 <input type='checkbox' />
//                 <label className="text-[14px] text-[#18181B]">Remember me</label>
//               </div>
//               <div>
//                 <label className="text-[#DA2638] text-[14px]">Forgot password?</label>
//               </div>
//             </div>

//             <div className="py-10">
//               <button type='submit' className="px-4 py-2 bg-[#3462B5] text-[#FFFFFF] rounded h-[55px] w-[160px] font-bold">
//                 Sign in
//               </button>
//             </div>

//           </div>
//         </form>
//       </div>

//       <div className="">
//         <Image src="/login.svg" alt="" height={982} width={641} />
//       </div>

//     </div>
//   )
// }
'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/auth/login');  
  }, [router]);

  return null; 
}
