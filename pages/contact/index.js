import ContactForm from "@/components/contact/ContactForm";
import RightSidebar from "@/components/contact/RightSidebar";
import SharedLayout from "@/components/Shared/SharedLayout";
import { getDatabase } from "@/db/mongoConnection";


const Contact = ({calendlyLink, services = []}) => {
    return (
        <SharedLayout>
            <div className="relative min-h-[100vh] flex w-full ">
                <ContactForm services={services} calendlyLink={calendlyLink}/>
                <div
                    className="sticky hidden h-[100vh] justify-center top-0 right-0 bg-[#ebebeb] xl:flex items-end w-[25%]">
                    <RightSidebar/>
                </div>
            </div>
        </SharedLayout>
    );
};

export default Contact;


export async function getServerSideProps() {
    const CalendlyLink = process.env.CALENDLY_LINK;
    const db = await getDatabase();
    const servicesList = await db.collection('services').find().project({_id: 0}).toArray();

    return {
        props: {
            calendlyLink: CalendlyLink,
            services: servicesList
        }
    }
}