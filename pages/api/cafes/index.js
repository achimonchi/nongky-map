const cafes = [
    {
        c_name : "Coffee A",
        c_profile : "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80",
        c_address : {
            street : "Jl Garuda Gg Pelita No 15",
            province : "Riau",
            city : "Pekanbaru"
        },
    },
    {
        c_name : "Coffee B",
        c_profile : "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80",
        c_address : {
            street : "Jl Garuda Gg Pelita No 15",
            province : "Riau",
            city : "Pekanbaru"
        },
    },
    {
        c_name : "Coffee C",
        c_profile : "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80",
        c_address : {
            street : "Jl Garuda Gg Pelita No 15",
            province : "Riau",
            city : "Pekanbaru"
        },
    },
    {
        c_name : "Coffee D",
        c_profile : "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80",
        c_address : {
            street : "Jl Garuda Gg Pelita No 15",
            province : "Riau",
            city : "Pekanbaru"
        },
    },
    {
        c_name : "Coffee E",
        c_profile : "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80",
        c_address : {
            street : "Jl Garuda Gg Pelita No 15",
            province : "Riau",
            city : "Pekanbaru"
        },
    },
]

export default async(req, res) => {
    const {method} = req;

    switch(method){
        case "GET" :
            const data = await fetchAll()
            res.status(200).json({ 
                status: 200,
                data: data
             })
        break;
    }
}

const fetchAll = () =>{
    return new Promise(async(resolve)=>{
        resolve(cafes);
    })
}

  