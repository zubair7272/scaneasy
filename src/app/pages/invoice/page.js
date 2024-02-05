"use client";
export default function invoice(){
    return(
        <>
        <main>
            {/* Header */}
            <header>
                <div>
                    <h2> Invoicer</h2>
                </div>
                <div>
                    <ul>
                        <li><></></li>
                        <li>Download</li>
                        <li>Send</li>
                    </ul>
                </div>
            </header>
            {/* End Of Header */}

            {/* Your Details */}
            <section>
                <input type="text" name="text" id="text" placeholder="Enter your name" required />
            </section>
            {/* End of Your Details */}
        </main>
        </>
    );
}