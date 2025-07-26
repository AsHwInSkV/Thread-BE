declare namespace NodeJS{
    interface ProcessEnv{
        JWT_SECRET : string;
        port : string;
        ADMIN_EMAIL : string;
        ADMIN_PASSWORD : string;
        DATABASE_URI : string;
        CLOUDINARY_NAME:string;
        CL_API_KEY:string;
        CL_API_SECRET:string;
    }
}
