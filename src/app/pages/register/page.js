// import next from "next";
import Image from "next/image"
export default function Register(){
    return(
        <section className="mt-9">

            <h1 className="text-center text-red-500 text-4xl mb-4">Register</h1>
            <form action="" className="block max-w-xs mx-auto">
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button type="submit">Register</button>
            <div className="my-4 text-center text-gray-600">
                Or Login 
            </div>
            <div>
                <button className="flex gap-4 justify-center">
                    <Image src={'/Google.png'} width={32} height={32} />
                    <p className="mt-1">
                        Login With Google
                    </p>
                </button>
            </div>
            </form>
        </section>
    );
}