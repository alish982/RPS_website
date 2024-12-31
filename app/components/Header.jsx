import Image from "next/image"

export default function Header(){
    return(
        <div className=" p-5 h-[60px] bg-[#D9D9D9]">
            <div className="flex justify-between">
                <div className="pl-20">
                    <Image src = '/hamburger.svg' alt = '' height={22} width={18} />
                </div>
                <div className="flex justify-between gap-5">
                    <div>
                        <Image src = '/setting.svg' alt = '' height={28} width={28} />
                    </div>
                    <div>
                        <Image className="" src = '/user.svg' alt = '' height={30} width={30} />
                    </div>
                </div>
            </div>
        </div>
    )}