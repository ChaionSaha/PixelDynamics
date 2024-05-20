
const Index = () => {
    
    return (
        <>
        </>
    );
}

export default Index;

export const getServerSideProps = async (ctx) => {


    return {
        redirect: {
            destination: '/payment/info',
            permenant: false
        }
    }
}