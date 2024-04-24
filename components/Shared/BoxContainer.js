import { useRouter } from "next/router";

const BoxContainer = ({ ptext, link, number }) => {
    const router = useRouter();
    return <div onClick={() => router.push(link)}
    className="lg:py-16 py-10  cursor-pointer flex flex-col justify-center items-center text-center text-4xl lg:text-6xl font-semibold
    rounded-lg bg-admin-secondary hover:shadow-lg hover:translate-y-[-2%] hover:scale-[1.01] duration-300 border border-transparent hover:border-base-300">
        {number}
        <p className='lg:text-lg text-base'>{ptext}</p>
    </div>
}

export default BoxContainer;