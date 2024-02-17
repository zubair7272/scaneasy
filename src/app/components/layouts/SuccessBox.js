export default function SuccessBox({children}){
    return(
        <div className="text-center bg-green-100 p-4 rounded-full mb-2 border-2 border-green-400">
            {children}
        </div>

    )
}