import JobFilterSidebar from "@/components/job-filter-sidebar";
import JobResults from "@/components/job-results";
import H1 from "@/components/ui/h1";
import { JobFilterValues } from "@/lib/validation";

interface PageProps {
  searchParams: {
    q?: string;
    type?: string;
    location?: string;
    remote?: string;
  };
}

export default async function Home({
  searchParams: { q, type, location, remote },
}: PageProps) {
  const filteredValues: JobFilterValues = {
    q,
    type,
    location,
    remote: remote === "true",
  };

  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      {/* {JSON.stringify(jobs)} */}

      <div className="space-y-5 text-center">
        <H1>Developer Jobs</H1>

        <p className="text-muted-foreground">Find your dream job.</p>
      </div>

      <section className="flex flex-col gap-5 md:flex-row">
        <JobFilterSidebar defaultValues={filteredValues} />
        <JobResults filterValues={filteredValues} />
      </section>
    </main>
  );
}
