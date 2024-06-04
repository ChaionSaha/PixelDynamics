import SharedLayout from "@/components/Shared/SharedLayout";
import Title from "@/components/Shared/title";
import TermsNavbar from "@/components/terms/TermsNavbar";
import { getDatabase } from "@/db/mongoConnection";
import YouTube from "react-youtube";

const Index = ({page}) => {
    return (
        <SharedLayout>
            <Title title={page.pageName} />
            <div className="mt-14">
                {
                    page.description.map((pd, i) => <div key={i}>
                        {
                            pd.key === 'text' &&
                        <div dangerouslySetInnerHTML={{__html: pd.text}} className='quill-css mt-5'></div>
                        }
                        {
                            pd.key === 'img' &&
                                            <img src={pd.img}
                                                alt={`${page.pageName}-${i}`} className='w-full mt-5'/>
                                            
                        }
                        {
                            pd.key === 'url' &&
                        <>
                            <YouTube videoId={pd.url.toString().split('=')[1]}
                                className='aspect-video youtube-video w-full h-full object-cover my-5 lg:mb-0'/>
                        </>
                        }
                    </div>)
                }
            </div>
        </SharedLayout>
    );
}

export default Index;

export const getServerSideProps = async (ctx) => {
    const { tpid } = ctx.query;
    const db = await getDatabase();
    const page = await db.collection('terms').findOne({ pageLink: tpid }, { projection: { _id: 0 } });
    
    if (!page)
        return {
            redirect: {
                destination: '/terms'
            }
        }
    
    return {
        props:{
            page
        }
    }
}

Index.getLayout = function getLayout(page) {
    return <TermsNavbar>{page}</TermsNavbar>
}