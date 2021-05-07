import { agent } from "../utils/agent"


export const fetchAll=()=>{
    return new Promise(async(resolve)=>{
        const res = await agent.get("/api/cafes");
        if(res.data?.status === 200){
            resolve(res.data);
        } else {
            resolve([])
        }
    })
}