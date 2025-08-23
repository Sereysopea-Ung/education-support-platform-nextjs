import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
    session: {
        strategy: "jwt" as const,
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required");
                }

                try {
                    // Lazy import to prevent import-time crashes if env vars are missing
                    const [{ getUserByEmail }, { default: isVerified }] = await Promise.all([
                        import("@/database/getUserByEmail"),
                        import("./isVerified"),
                    ]);

                    const user = await getUserByEmail(credentials.email);

                    if (!user) {
                        throw new Error("User not found");
                    }

                    const passwordIsMatch = await checkPassword(credentials.password, user.password);
                    const verified = await isVerified(credentials.email); // Store result to avoid duplicate calls

                    if (passwordIsMatch && verified) {
                        return user;
                    } else if (passwordIsMatch && !verified) {
                        throw new Error("Your account is not verified yet!");
                    } else {
                        throw new Error("Incorrect password");
                    }
                } catch (error) {
                    console.error("Authorization error:", error);
                    throw new Error("Authorization failed, please try again");
                }
            },
        }),
    ],
};

async function checkPassword(enteredPassword: string, storedHashedPassword: string): Promise<boolean> {
    try {
        return await bcrypt.compare(enteredPassword, storedHashedPassword);
    } catch (error) {
        console.error("Error comparing passwords:", error);
        return false;
    }
}

export default NextAuth(authOptions);
