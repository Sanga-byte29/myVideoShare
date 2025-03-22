import bcrypt from "bcrypt";

export const hashPassword = async (
    originalPassword: string): Promise<string> => {
        return await bcrypt.hash(originalPassword, 16);
    }