import Title from '@/components/Shared/title';
import { getDatabase } from '@/db/mongoConnection';

const Services = ({ services = [] }) => {
	return (
		<div className='container'>
			<Title title='Services' />
			Services Page
		</div>
	);
};

export default Services;

export async function getServerSideProps() {
	const db = await getDatabase();
	const servicesCollection = db.collection('services');
	const serviceList = await servicesCollection
		.find()
		.project({ _id: 0 })
		.toArray();
	return {
		props: {
			services: serviceList,
		},
	};
}
