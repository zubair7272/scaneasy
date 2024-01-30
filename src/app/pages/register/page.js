export default function Register(){
    return(
        <section className="mt-9">

            <h1 className="text-center text-red-500 text-4xl">Register</h1>
            <form action="">
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button type="submit">Register</button>
            </form>
        </section>
    );
}