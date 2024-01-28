import Image  from "next/image";
import Items from "./items";
export default function Menu(){
    return (
        <section>
            {/* <div className="absolute h-full left-0 right-0 w-full justify-start">
                <div className="absolute left-0 -top-[70px] text-left -z-10">
                    <Image src={'/Logo.jpg'} width={100} height={189} alt={'Logo'}></Image>
                </div>
                <div className="absolute -top-[100px] right-0  -z-10">
                    <Image src={'/Logo.jpg'} width={100} height={189} alt={'Logo'}></Image>
                </div>
            </div> */}
            <div className="text-center mb-4">
                <h3 className="text-red-600 font bold text-4xl italic">
                    MENU
                </h3>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <Items />
                <Items />
                <Items />
                <Items />
                <Items />
                <Items />
            </div>
        </section>
    );
}