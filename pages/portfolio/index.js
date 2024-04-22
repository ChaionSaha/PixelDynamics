import Title from '@/components/Shared/title';
import SharedLayout from "@/components/Shared/SharedLayout";
import {getDatabase} from "@/db/mongoConnection";
import {useRouter} from "next/router";
import Image from "next/image";

const Portfolio = ({portfolios}) => {
    const router = useRouter();
    return (
        <SharedLayout>
            <div>
                <Title title='Portfolio'/>
                {
                    portfolios.map((p, i) =>
                        <div onClick={() => router.push(`/portfolio/${p.pfid}`)} key={i}
                             className='w-full overflow-hidden relative lg:h-[50vh] h-[33vh] cursor-pointer'>
                            <Image fill quality={100} src={p.profileImage} alt={p.name}
                                   className='object-cover hover:scale-[1.05] duration-300'/>
                        </div>
                    )
                }
            </div>
        </SharedLayout>
    );
};

export default Portfolio;

export async function getServerSideProps({req, res}) {
    const db = await getDatabase();
    const portfolios = await db.collection('portfolio').find().project({_id: 0}).toArray();
    portfolios.sort((a, b) => +a.position - +b.position);

    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )


    return {
        props: {
            portfolios
        }
    }
}
