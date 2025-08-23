import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const session = (await getServerSession(req, res, authOptions as any)) as any;
  const email: string | undefined = session?.user?.email;
  if (!email) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const user = await client.fetch(
      `*[_type == "user" && email == $email][0]{
        _id,
        email,
        username,
        bio,
        phone,
        telegram,
        facebook,
        "profilePhoto": profile_pic_from_cloudinary
      }`,
      { email }
    );

    if (!user) return res.status(404).json({ error: "User not found" });

    return res.status(200).json({ user });
  } catch (e) {
    console.error("/api/settings/me error", e);
    return res.status(500).json({ error: "Internal server error" });
  }
}
