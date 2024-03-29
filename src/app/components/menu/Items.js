import Image from 'next/image'
export default function Items(){
    return(
        <div className="bg-gray-200 p-4 rounded-lg text-center group hover:bg-white hover:shadow-md hover:shadow-black/50 trasition-all">
            <Image src="" alt="Image Here" />
            <h4 className="font-semibold text-xl my-3">
                Item Name Here
            </h4>
            <p className="text-gray-500 text-sm">Item Description Here</p>
            <button className="mt-4 bg-blue-700 text-white rounded-full px-8  py-2">Add To Cart</button>
        </div>
    );
}