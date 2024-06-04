import videoLoop from '@/assets/homepage-video.mp4';
import SharedLayout from '@/components/Shared/SharedLayout';
import Title from '@/components/Shared/title';

export default function Home() {
    return (
        <SharedLayout>
            <div>
                <Title title='Home' />
                <div className='overflow-hidden pointer-events-none'>
                    <video
                        className=' w-[100vw] h-[100vh] '
                        style={{
                            objectFit: 'cover',
                            overflowClipMargin: 'content-box',
                            overflow: 'clip',
                        }}
                        src={videoLoop}
                        type='video/mp4'
                        loop
                        autoPlay
                        muted
                        playsInline
                        preload='none'
                    />
                </div>
            </div>
        </SharedLayout>
    );
}
