import Image from "next/image"
export default function Sidebar(){
    return(
        <div className="absolute top-0 p-5 gap-4 bg-white border h-full w-[70px]">
            <div className="py-4 bg=white" height = {35} width = {35} />
            <div className="py-4 bg=white" height = {35} width = {35} />
            <Image className="py-4" src ='/box.svg' alt = '' height = {35} width = {35} />
            <Image className="py-4" src ='/building.svg' alt = '' height = {35} width = {35} />
        </div>
    )
}