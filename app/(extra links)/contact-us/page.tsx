import Link from "next/link";

export default function Contact(){
    return (
        <div>
            <div className="flex flex-col w-full justify-center items-center mt-5 md:mt-10 group relative">
                <h1 className="flex lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-bold">📬 Contact Us</h1>
                <span className="absolute bottom-[-10px] left-0 w-full h-[2px] bg-[#4B5563] mx-5 md:mx-10"></span>
            </div>
            <div className=" mt-5 md:mt-10 mx-5 md:mx-10">
                <h1 className="lg:text-2xl md:text-xl sm:text-lg text-md mb-6 md:mb-10 text-justify">
                    We’re here to assist you! Whether you need support or have a question, reach out, and we’ll help you get the answers you need.
                </h1>
                <h1 className="lg:text-3xl md:text-2xl sm:text-xl text-lg font-bold mb-3 md:mb-5">Email Support</h1>
                <h1 className="lg:text-2xl md:text-xl sm:text-lg text-md mb-3 md:mb-5 text-[#2563EB]">
                    📧 support@s3tudy.com
                </h1>
                <h1 className="lg:text-2xl md:text-xl sm:text-lg text-md mb-6 md:mb-10">
                    For general inquiries or if you need help with your account, send us an email, and our team will respond as soon as possible.
                </h1>
                <h1 className="lg:text-3xl md:text-2xl sm:text-xl text-lg font-bold mb-3 md:mb-5">Need Help?</h1>
                <h1 className="lg:text-2xl md:text-xl sm:text-lg text-md mb-3 md:mb-5 ">
                    Before reaching out, you might find the answer you're looking for in our
                    <span>
                        <Link href="/help-center">
                            <button className="text-[#2563EB] ml-2 hover:cursor-pointer"> Help Center </button>
                        </Link>
                    </span>
                    . We’ve gathered helpful articles, guides, and FAQs to assist with common questions.
                </h1>
            </div>
        </div>
    )
}