import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { createClient } from "@sanity/client";
import { v2 as cloudinary } from "cloudinary";
import twilio from "twilio";

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const twilioClient = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
  ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  : null;

// Increase body size limit to allow base64 images (adjust as needed)
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const session = (await getServerSession(req, res, authOptions as any)) as any;
  const email: string | undefined = session?.user?.email;
  if (!email) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { username, bio, phone, telegram, facebook, profilePhotoDataUrl } = req.body || {};

  try {
    // Load current user
    const currentUser = await sanity.fetch(
      `*[_type == "user" && email == $email][0]{_id, phone}`,
      { email }
    );

    if (!currentUser?._id) {
      return res.status(404).json({ error: "User not found" });
    }

    // Upload image to Cloudinary if provided
    let profilePhotoUrl: string | undefined;
    if (profilePhotoDataUrl) {
      const upload = await cloudinary.uploader.upload(profilePhotoDataUrl, {
        folder: "profiles",
        resource_type: "image",
        overwrite: true,
      });
      profilePhotoUrl = upload.secure_url;
    }

    // Build patch object only with provided values
    const patch: Record<string, any> = {};
    if (typeof username === "string" && username.trim() !== "") patch.username = username.trim();
    if (typeof bio === "string" && bio.trim() !== "") patch.bio = bio.trim();
    if (typeof phone === "string" && phone.trim() !== "") patch.phone = phone.trim();
    if (typeof telegram === "string" && telegram.trim() !== "") patch.telegram = telegram.trim();
    if (typeof facebook === "string" && facebook.trim() !== "") patch.facebook = facebook.trim();
    if (profilePhotoUrl) patch.profile_pic_from_cloudinary = profilePhotoUrl;

    if (Object.keys(patch).length > 0) {
      await sanity.patch(currentUser._id).set(patch).commit();
    }

    // If user already had a phone number before update, trigger OTP via Twilio Verify (if configured)
    if (currentUser.phone && twilioClient && process.env.TWILIO_VERIFY_SERVICE_SID) {
      await twilioClient.verify.v2.services(process.env.TWILIO_VERIFY_SERVICE_SID)
        .verifications.create({ to: currentUser.phone, channel: "sms" });
    }

    return res.status(200).json({ success: true, profilePhotoUrl });
  } catch (e) {
    console.error("/api/settings/update error", e);
    return res.status(500).json({ error: "Internal server error" });
  }
}
