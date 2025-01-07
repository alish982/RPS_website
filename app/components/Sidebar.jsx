import Image from "next/image"
import Link from "next/link";
import { usePathname } from 'next/navigation'
export default function Sidebar(){
const pathname = usePathname()

    return(
        <div className="absolute top-0 p-5 gap-4 bg-white border h-full w-[70px]">
            <div className="py-4 bg=white" height = {35} width = {35} />
            <div className="py-4 bg=white" height = {35} width = {35} />
            <Link href = '/dashboard' className="">
                 <Image className="py-4" src ='/box.svg' alt = '' height = {35} width = {35} />
            </Link>
            <Image className="py-4" src ='/building.svg' alt = '' height = {35} width = {35} />
        </div>
    )
}