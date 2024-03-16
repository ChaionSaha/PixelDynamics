import Title from '@/components/Shared/title';
import videoLoop from '@/assets/homepage-video.mp4';

export default function Home() {
    return (
        <div>
            <Title title='Home'/>
            <div className='  overflow-hidden'>
                <video
                    className=' w-auto h-[100vh] '
                    style={{
                        objectFit: "cover",
                        overflowClipMargin: "content-box",
                        overflow: "clip"
                    }}
                    src={videoLoop}
                    autoPlay
                    type='video/mp4'
                    loop
                    muted
                />
            </div>
        </div>
    );
}
