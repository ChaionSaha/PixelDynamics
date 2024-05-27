import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const useClientDetails = () => {
    const client = useSelector(state => state.client);
    const router = useRouter();
    const isPaid = useSelector(state => state.isPaid);
    

    useEffect(() => {
        if (!client?.selectedPlan && !isPaid) router.push('/services');
    },[client, router, isPaid])
    
    return client;
}

export default useClientDetails;