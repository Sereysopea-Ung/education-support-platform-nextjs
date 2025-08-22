import { redirect } from "next/navigation";

export default function SettingsIndexPage() {
  // Server-side redirect to default tab
  redirect("/settings/edit-profile");
}
