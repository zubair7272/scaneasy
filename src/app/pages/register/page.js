export default function Register(){
    return(
        <section className="mt-9">

            <h1 className="text-center text-red-500 text-4xl mb-4">Register</h1>
            <form action="" className="block max-w-xs mx-auto">
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button type="submit">Register</button>
            </form>
            <div>
                Or Login 
            </div>
            <div>
                <button>
                    Login With Google
                </button>
            </div>
        </section>
    );
}