import TeamMember from "@/components/team/TeamMember";

const AllTeamMember = ({team}) => {
    return (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
            {
                team.map((t, i) => (<TeamMember key={i} {...t}/>))
            }
        </div>
    );
};

export default AllTeamMember;