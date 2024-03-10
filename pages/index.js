import Title from "@/components/Shared/title";
import videoLoop from '@/assets/homepage-video.mp4'

export default function Home() {
    return (
        <div>
            <Title title='Home'/>
            <div className="w-full h-full overflow-hidden">
                <video className='min-w-full min-h-[100vh] scale-[1.01] ' src={videoLoop} autoPlay
                       type='video/mp4' loop
                       muted/>
            </div>
        </div>
    );
}
