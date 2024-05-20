import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const useClientDetails = () => {
    const client = useSelector(state => state.client);
    const router = useRouter();

    useEffect(() => {
        if (!client?.selectedPlan) router.push('/services');
    },[client, router])
    
    return client;
}

export default useClientDetails;