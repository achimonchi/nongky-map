const NodeGeocoder = require('node-geocoder');
const nextConfig = require('../../../config/next.config');

export default async (req,res)=>{
    const {method} = req;

    

    switch(method){
        case "GET" :
            res.status(200).json({method});
            break;
        case "POST" :
            try{
                const options = {
                    provider: "openstreetmap",
                    apiKey: nextConfig.default.TOKEN_MAP,
                    formatter:null
                }
            
                const geocoder = NodeGeocoder(options);
                const {lat, lon} = req.body;
    
                const data = await geocoder.reverse({lat,lon});
                console.log({dataPost:data})
                res.status(200).json({data:data[0]});
            } catch(err){
                console.log(err)
                res.status(200).json({method});
            }
        break;

    }    
}