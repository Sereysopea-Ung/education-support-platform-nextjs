import { createClient } from '@sanity/client';

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

const getTypePosts = async () => {
  try {
    const query = `*[_type in ["post", "job", "scholarship", "report", "user"]] | order(_createdAt desc){
      _id,
      _type,
      title,
      _createdAt,
      typePost,
      upvote,
      downvote,
      postImages,
      images,
      files,
      pitch,
      name,
      "commentCount": count(*[_type == "comment" && references(^._id)]),
      author->{profile_pic, role, year, major, experience, username, department, followers, name},
      jobTitle,
      companyName,
      numberOfApplication,
      typeofjob,
      scholarshipTitle,
      forApplicant,
      amountOfMoney,
      typeofcoverage,
      reportType
    }`;

    const posts = await client.fetch(query);
    return posts;
  } catch (error) {
    console.error("Error fetching all posts:", error);
    return [];
  }
};


export async function GET(_req: Request) {
    try {
        const posts = await getTypePosts();
        return new Response(JSON.stringify(posts), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error in GET request:", error); // Added more specific error logging here
        return new Response(JSON.stringify({ error: "Failed to fetch all posts" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}
