import SharedLayout from "@/components/Shared/SharedLayout";
import Title from '@/components/Shared/title';
import AllTeamMember from "@/components/team/AllTeamMember";
import TeamCarousel from "@/components/team/TeamCarousel";
import TeamMarquee from "@/components/team/TeamMarquee";
import { getDatabase } from "@/db/mongoConnection";

const Team = ({ team = [], }) => {
    return (
        <SharedLayout>
            <div>
                <Title title='Team' />
                <p className="text-xl font-bold md:text-2xl md:pt-7 pt-5 ps-16 lg:text-3xl">Meet Our Highly Talented
                    Team
                    Members</p>
                <div className=''>
                    <TeamCarousel team={team} />
                </div>
                <div className="h-2 w-full bg-[#ebebeb] mb-5"></div>
                <TeamMarquee />
                <div className="px-5 lg:ps-16 lg:pe-10 mt-16 mb-10">
                    <AllTeamMember team={team} />
                </div>
            </div>
        </SharedLayout>
    );
};

export default Team;

export async function getServerSideProps(context) {
    const db = await getDatabase();
    const teamMembers = await db.collection('teamMembers').find().project({ _id: 0 }).toArray();

    
    return {
        props: {
            team: teamMembers,
        }
    }
}
