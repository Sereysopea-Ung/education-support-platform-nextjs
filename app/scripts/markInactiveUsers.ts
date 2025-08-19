import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false
});

async function markInactiveUsers() {
  const inactiveUsers = await client.fetch(`
    *[_type == "user" && dateTime(lastActive) < dateTime(now()) - 7*24*60*60]{
      _id
    }
  `);

  for (const user of inactiveUsers) {
    await client.patch(user._id).set({ status: "inactive" }).commit();
  }
    

  console.log(`Marked ${inactiveUsers.length} users as inactive`);
}

markInactiveUsers();
 