import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const usePlan = () => {
    const plan = useSelector(state => state.plan);
    const router = useRouter();
    
    useEffect(() => {
        if(!plan?.spid) router.push('/services')
    },[plan, router])
    
    return plan;
}

export default usePlan;