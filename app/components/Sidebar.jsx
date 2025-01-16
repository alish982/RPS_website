import Image from "next/image"
export default function Sidebar(){

const handleReload = () => {
  window.location.href = '/dashboard';
};

    return(
        <div className="absolute top-0 p-5 gap-4 bg-white border h-full w-[70px] cursor-pointer">
            <div className="py-4 bg=white" height = {35} width = {35} />
            <div className="py-4 bg=white" height = {35} width = {35} />
            <div className="transpose transition hover:scale-125" onClick={handleReload}>
                 <Image className="py-4" src ='/box.svg' alt = '' height = {35} width = {35} />
            </div>
            <Image className="py-4 transpose transition hover:scale-125" src ='/building.svg' alt = '' height = {35} width = {35} />
        </div>
    )
}