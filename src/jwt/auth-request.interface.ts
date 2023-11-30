// auth-request.interface.ts
import { Request } from 'express';

interface AuthRequest extends Request {
    user: any; // Define the 'user' property based on your JWT payload structure
}

export default AuthRequest;
