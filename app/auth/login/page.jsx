'use client'
import Image from "next/image"
import { useFormik } from 'formik'
import axiosInstance from "@/app/utils/axiosInstance"
import { useRouter } from "next/navigation"
import Cookies from 'js-cookie';
import toast from "react-hot-toast"
import { useState } from "react"

export default function Login() {
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const validate = values => {
    const errors = {}

    if (!values.email) {
      errors.email = 'Required'
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address'
    }


    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 5) {
      errors.password = "Password must be more than 5 characters";
    }

    return errors;
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      firebase_token:'',
      last_login_gps: '',
      device_id: ''
    },
    validate,
    onSubmit: async (values) => {
      const data = {
        email: values.email,
        password: values.password,
        firebase_token: '',
        last_login_gps: '', 
        device_id: '23'
      }

 try {
  setLoading(true)
    const response = await axiosInstance.post('login/', data);
    console.log(response)
    router.push('/dashboard');

    if (response.status === 200) {
      localStorage.setItem('access_token', response.data.data.access_token)
      Cookies.set('access_token', response.data.data.access_token, {
        expires: 7,  
        path: '/',   
        secure: true,
        sameSite:'None'
      });
      
    } else {
      console.log('Error: Login failed');
    }
  } catch (error) {
    if(error.status === 401 ){
      toast.error('Your Company is Unauthorized')
    }
     if(error.status === 403 ){
      toast.error('Wrong Credentials')
    }
     if(error.status === 404 ){
      toast.error('Url Not Found')
    }
  }
  finally {
    console.log(Cookies.get('access_token'))
    setLoading(false)
  }
}
})



  return (
    <div className="flex h-screen">
      <div className="pl-4 pt-4">
 <Image src="/logo.svg" alt="" height={150} width={150} />
      </div>
         
  <div className="relative w-2/3 p-5 flex flex-col justify-center">

    
    <form onSubmit={formik.handleSubmit} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[526px]">
      <div>
        <div>
          <label className="text-[#090914] font-bold text-[20px] sm:text-[20px] md:text-[20px] lg:text-[36px] xl:text-[44px]">Login</label>
        </div>

        <div className="py-5 flex flex-col">
          <label className="py-2 text-[#090914CC]">Email</label>
          <input
            name='email'
            className='border border-[#CBD5E1] rounded-lg h-[60px] w-full px-4 text-[#090914CC]'
            type='text'
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-xs">{formik.errors.email}</div>
          )}
        </div>

        <div className="flex flex-col">
          <label className="py-2 text-[#090914CC]">Password</label>
          <input
            name='password'
            className='border border-[#CBD5E1] rounded-lg h-[60px] w-full px-4 text-[#090914CC]'
            type='password'
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-xs">{formik.errors.password}</div>
          )}
        </div>

        <div className="flex justify-between mt-4">
          <div className="flex gap-3">
            <input type='checkbox' />
            <label className="text-[14px] text-[#18181B]">Remember me</label>
          </div>
          <div>
            <label className="text-[#DA2638] text-[14px]">Forgot password?</label>
          </div>
        </div>

        <div className="py-10">
          {loading ?  <button className="flex justify-center px-4 py-2 bg-[#3462B5] text-[#FFFFFF] rounded h-[55px] w-[160px] font-bold disabled">
            <div className="w-10 h-10 border-4 border-t-transparent border-white border-solid rounded-full animate-spin"></div>
          </button> :  <button type='submit' className="px-4 py-2 bg-[#3462B5] text-[#FFFFFF] rounded h-[55px] w-[160px] font-bold">
            Sign in
          </button> }
        </div>
      </div>
    </form>
  </div>


  <div className="relative w-1/3">
    <Image src="/login.svg" alt="" layout="fill" objectFit="cover" />
  </div>
</div>

  )
}
