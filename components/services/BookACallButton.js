import { useRouter } from "next/router";

const BookACallButton = ({className}) => {
    const router = useRouter();

    return (
        <button onClick={() => router.push('/contact')}
            className={`${className} border-2 border-black px-10 xl:px-20 laptop:px-16 text-lg laptop:text-lg lg:text-xl font-semibold hover:bg-black hover:text-base-100 duration-300 `}>
            Book a Call
        </button>
    );
};

export default BookACallButton;

