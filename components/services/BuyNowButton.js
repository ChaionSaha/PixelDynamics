import { useRouter } from "next/router";

const BuyNowButton = ({ handleClick, className }) => {
    const router = useRouter()
    return (
        <button onClick={handleClick}
            className={`${className} border-2 border-black px-10 xl:px-20 text-lg lg:text-xl font-semibold bg-black hover:bg-transparent hover:text-black text-base-100 duration-300 `}>
            Buy Now
        </button>
    );
}

export default BuyNowButton;