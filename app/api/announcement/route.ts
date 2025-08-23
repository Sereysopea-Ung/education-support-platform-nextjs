// app/api/announcement/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN!,
});

// helper: get user by email
const getUserByEmail = async (email: string) => {
  const query = `*[_type == "user" && email == $email][0]{ _id }`;
  return client.fetch(query, { email });
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { category, title, content, deadline, company, location, salary, requirements, benefits, images, files, authorEmail } = body;

    // Find the author
    let authorRef = null;
    if (authorEmail) {
      const user = await getUserByEmail(authorEmail);
      if (user?._id) {
        authorRef = { _type: "reference", _ref: user._id };
      }
    }

    // Base document
    const doc: any = {
      _type: category === "announcement" ? "post" : category,
      title,
      typePost:"Announcement",
      pitch: content,
      createdAt: new Date().toISOString(),
      images,
      files,
      author: authorRef, // ✅ attach author reference if found
    };

    // Category-specific mapping
    if (category === "news") {
      doc.newsTitle = title;
      doc.content = content;
    }

    if (category === "scholarship") {
      doc.scholarshipTitle = title;
      doc.deadline = deadline;
      doc.requirements = requirements || [];
      doc.content = content;
    }

    if (category === "job") {
      doc.jobTitle = title;
      doc.companyName = company;
      doc.location = location;
      doc.salary = salary;
      doc.requirements = requirements || [];
      doc.benefits = benefits || [];
      doc.content = content;
    }

    const result = await client.create(doc);

    return NextResponse.json({ success: true, data: result });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
