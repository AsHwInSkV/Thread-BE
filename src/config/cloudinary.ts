import {v2 as cloudinary} from 'cloudinary';

const cloudinaryConnect = async ()=>{
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME, 
        api_key: process.env.CL_API_KEY, 
        api_secret: process.env.CL_API_SECRET // Click 'View API Keys' above to copy your API secret
    });
}

export default cloudinaryConnect;