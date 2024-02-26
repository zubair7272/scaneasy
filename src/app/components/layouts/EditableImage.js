import Image from "next/image";
import toast from "react-hot-toast";

export default function EditabbleImage({link, setLink}){
    async function handleOnUpload(ev){
        // console.log('upload')
        const files = ev.target.files
        // console.log(files)
        if(files?.length === 1){
            // console.log('upload2')
            const data = new FormData
            data.set('file',files[0])
            const savingPromise = new Promise(async (resolve , reject)=>{
                const response = await fetch('/api/upload',{
                    method : 'POST',
                    headers : {'contetn-type':'multipart/form-data'},
                    body : data
                })
                if(response.ok){
                    const link = await response.json()
                    setLink(link)
                    resolve();
                }
            else{
                reject();
            }
               

            })
            toast.promise(savingPromise,{
                loading : 'Uploading...',
                success : 'Upload Succefull',
                error : 'Error'
            })
            
            


        }

    }
    return(
        <>
        <div className="flex gap-2 bg-gray-300 p-2 rounded-full mb-1 max-w-xs mx-auto mt-8">
        {link &&(
            
                <Image className="rounded-lg w-full h-full mb-1" src={link} width={80} height={80} alt={'Profile Picture'} />
            
            )}
        {!link && (
        <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1 ">
          No image
        </div>
      )}
        </div>

        <label>

            <input type="file" className="hidden"  onChange={handleOnUpload}/>
                <span className=" block border border-gray-300 rounded-lg text-center cursor-pointer">
                    Edit
                </span>
        </label>
        </>
    )
}