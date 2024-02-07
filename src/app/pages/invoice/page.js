"use client";
export default function invoice(){
    const handlePrint = () =>{
        window.print()
    }
    return(
        <>
        <main className="m-5 p-5 xl:max-w-4xl xl:mx-auto bg-white rounded shadow">
            {/* Header */}
            <header className="flex flex-col items-center justify-center mb-5 xl:flex-row xl:justify-between">
                <div>
                    <h1 className="font-bold uppercase tracking-wide text-4xl mb-3"> Invoicer</h1>
                </div>
                <div>
                    <ul className="flex items-center justify-between flex-wrap">
                        <li>
                            <button onClick={handlePrint} className="btn btn-print">Print</button>
                        </li>
                        <li>
                            <button className="btn btn-download">Download</button>
                        </li>
                        <li>
                            <button className="btn btn-send">Send</button>
                        </li>
                    </ul>
                </div>
            </header>
            {/* End Of Header */}

            {/* Your Details */}
            <section className="flex flex-col items-end justify-end">
                <h2 className="text-xl uppercase">Mohammad Adnan</h2>
                <p>Your Address</p>
            </section>
            {/* End of Your Details */}
            {/* Client Details */}
            <section className="mt-5">
                <h2 className="text-xl uppercase">Clients Name</h2>
                <p>Clients Address</p> 
            </section>
            {/* End of Client details */}
            {/* Dates */}
            <article className="my-5 flex items-end justify-end">
                <ul>
                    <li>
                        <span className="font-bold">Invoice Number : </span>
                    </li>
                    <li>
                        <span className="font-bold">Invoice date : </span>
                    </li>
                    <li>
                        <span className="font-bold">Due Date :  </span>
                    </li>
                </ul>
            </article>
            {/* End of dates */}
            {/* Table */}
                <div className="my-5">
                    This is the table 
                </div>
            {/* End of table */}

            {/*Notes  */}
            <section className="mb-5">
                {/* Textarea */}
                <p>
                    Notes to Clients....
                </p>
            </section>
            {/* End of note */}

            {/* footer */}
            <footer>
                <ul className=" flex flex-wrap items-center justify-center">
                    <li>
                        <span className="font-bold">Your Name : </span> Mohammad Adnan
                    </li>

                    <li>
                        <span className="font-bold">Your Email : </span>adnan@gmail.com
                    </li>

                    <li>
                        <span className="font-bold">Your Phone Number : </span>1234 348 453
                    </li>

                    <li>
                        <span className="font-bold">Bank : </span>SBI
                     </li>

                    <li>
                        <span className="font-bold">Account Holder : </span>Adnan
                    </li>

                    <li>
                        <span className="font-bold">Account Number : </span>3454 5674 2343 5463
                    </li>

                    <li>
                        <span className="font-bold">Website : </span>www.easyorder.com
                    </li>
                </ul>
            </footer>
            {/* End of footer */}
        </main>
        </>
    );
}