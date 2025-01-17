import Image from "next/image"
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';


export default function Header(){
    
    const router = useRouter()

    const handleLogout = () => {
        localStorage.clear();
        Cookies.remove('access_token', { path: '/' });
        router.push('/auth/login')
        
    }
    return(
        <div className="p-5 h-[60px] bg-[#D9D9D9]">
            <div className="flex justify-between">
                <div className="pl-20">
                    <Image src = '/hamburger.svg' alt = '' height={22} width={18} />
                </div>
                <div className="flex justify-between gap-5">
                    <div>
                        <Image src = '/setting.svg' alt = '' height={28} width={28} />
                    </div>
                    <div className="">
                        <Image className="" src = '/user.svg' alt = '' height={30} width={30} />
                    </div>
                    <div className="cursor-pointer" onClick={handleLogout}>
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="size-7 hover:stroke-red-500 transition-all duration-200">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                       </svg>

                    </div>
                </div>
            </div>
        </div>
    )}