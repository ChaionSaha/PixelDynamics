import Title from '@/components/Shared/title';
import SharedLayout from "@/components/Shared/SharedLayout";

const Team = () => {
    return (
        <SharedLayout>
            <div>
                <Title title='Team'/>
                <p className="text-xl font-bold md:text-2xl pt-7 ps-16 lg:text-3xl">Meet Our Highly Talented Team
                    Members</p>
            </div>
        </SharedLayout>
    );
};

export default Team;
