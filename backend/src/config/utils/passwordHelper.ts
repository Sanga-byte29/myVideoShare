import bcrypt from "bcrypt";

export const hashPassword = async (
    originalPassword: string): Promise<string> => {
        return await bcrypt.hash(originalPassword, 16);
    }

export const compareHashedPassword = async (originalPassword: string, dBPassword: string): Promise<boolean> => {
    console.log("Original Password:", originalPassword);
    console.log("Hashed Password from DB:", dBPassword);
    return await bcrypt.compare(originalPassword, dBPassword);
}