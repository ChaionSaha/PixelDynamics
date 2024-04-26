import TeamMemberForm from "@/components/admin/team/TeamMemberForm";
import AdminPageTitle from "@/components/Shared/AdminPageTitle";
import Title from "@/components/Shared/title";
import { getDatabase } from "@/db/mongoConnection";

export default function EditAddTeam({ teamMember, isEdit }) {
    
    return (
        <div>
            <Title title={isEdit ? 'Edit Team Member' : 'Add Team Member'} />
            <AdminPageTitle title={isEdit ? 'Edit Team Member' : 'Add Team Member'} />
            <div className="md:px-10 px-5 py-10">
                <TeamMemberForm member={teamMember} isEdit={isEdit}/>
            </div>
        </div>
    )
}


export async function getServerSideProps(context) {
    const { id } = context.query;
    let teamMember={}

    if (id[0] !== 'add' && id[0] !== 'edit')
        return {
            redirect: {
                destination: '/admin/team',
                permanent:false
            }
        }

    if (id[0] === 'add')
        return {
            props:
            {
                teamMember:{}, isEdit:false
            }
        }
    
    if (id[0] === 'edit' && id.length !== 2)
        return {
            redirect: {
                destination: '/admin/team',
            }
        }
    
    
    const tid = id[1];
    const db = await getDatabase();
    teamMember = await db.collection('teamMembers').findOne({ tid }, { projection: { _id: 0 } });

    if (!teamMember)
        return {
            redirect: {
                destination: 'admin/team',
                permanent: false
            }
            
        }
        
    return {
        props: {
            teamMember, isEdit:true
        }
    }

    
}