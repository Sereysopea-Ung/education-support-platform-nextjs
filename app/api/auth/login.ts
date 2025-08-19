import { createClient } from "@sanity/client";
import type { NextApiRequest, NextApiResponse } from "next";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false
});

interface LoginRequestBody {
    email: string;
    password: string;
}

interface User {
    _id: string;
    _type: string;
    email: string;
    password: string;
    lastActive?: string;
    status?: string;
    // add other user fields as needed
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ message: string; user?: User }>
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { email, password } = req.body as LoginRequestBody;

    try {
        // ✅ 1. Find user by email
        const user: User | null = await client.fetch(
            `*[_type == "user" && email == $email][0]`,
            { email }
        );

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
 
        // ✅ 2. Verify password (pseudo-code, depends on your hashing)
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // ✅ 3. Update lastActive and status
        await client
        .patch(user._id)
        .set({ lastActive: new Date().toISOString(), status: "active" })
        .commit();

        // ✅ 4. Fetch updated user to get latest lastActive
        const updatedUser = await client.fetch(
        `*[_type == "user" && _id == $id][0]`,
        { id: user._id }
        );

        // ✅ 5. Return updated user
        return res.status(200).json({
        message: "Login successful",
        user: updatedUser
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
