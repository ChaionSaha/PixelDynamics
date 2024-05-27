import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const usePlan = () => {
    const plan = useSelector(state => state.plan);
    const router = useRouter();
    const isPaid = useSelector(state => state.isPaid);
    
    useEffect(() => {
        if(!plan?.spid && !isPaid) router.push('/services')
    },[plan, router, isPaid])
    
    return plan;
}

export default usePlan;