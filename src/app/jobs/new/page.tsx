import { Metadata } from "next";
import NewJobForm from "@/app/jobs/new/new-job-form";

export const metadata: Metadata = {
  title: "Post a new job",
};

export default function Page() {
  return <NewJobForm />;
}
