import { ChevronLeftIcon } from "@/assets/CustomIcons/CustomIcon";
import SharedLayout from "@/components/Shared/SharedLayout";
import Title from "@/components/Shared/title";
import { getDatabase } from "@/db/mongoConnection";
import { useRouter } from "next/router";
import YouTube from "react-youtube";

const Index = ({portfolio}) => {
    const router = useRouter();
    return (
        <SharedLayout>
            <Title title={portfolio.name}/>
            <div>
                <div className="flex lg:text-3xl text-2xl items-center gap-x-5 lg:ps-10 ps-16 lg:px-10 px-2 py-7 font-bold">
                    <button onClick={() => {
                        router.push('/portfolio');
                    }}><ChevronLeftIcon className='w-5 h-5'/></button>
                    <p>{portfolio.name}</p>
                </div>
                {
                    portfolio.description.map((pd, i) => <div key={i}>
                        {
                            pd.key === 'text' &&
                            <div dangerouslySetInnerHTML={{__html: pd.text}} className='quill-css px-10 py-10'></div>
                        }
                        {
                            pd.key === 'img' &&
                            <img src={pd.img}
                                alt={`${portfolio.name}-${i}`} className='w-full'/>

                        }
                        {
                            pd.key === 'url' &&
                            <>
                                <YouTube videoId={pd.url.toString().split('=')[1]}
                                    className='aspect-video youtube-video w-full h-full object-cover lg:px-20 lg:py-20 mb-5 lg:mb-0'/>
                            </>
                        }
                    </div>)
                }
            </div>
        </SharedLayout>
    );
};

export default Index;

export async function getServerSideProps(context) {
    const {pfid} = context.query;
    const db = await getDatabase();
    const portfolio = await db.collection('portfolio').findOne({pfid}, {projection: {_id: 0}});

    return {
        props: {
            portfolio
        }
    }
}