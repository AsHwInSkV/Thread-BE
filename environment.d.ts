declare namespace NodeJS{
    interface ProcessEnv{
        JWT_SECRET : string;
        port : string;
        ADMIN_EMAIL : string;
        ADMIN_PASSWORD : string;
        DATABASE_URI : string;
    }
}
