import JobFilterSidebar from "@/components/job-filter-sidebar";
import JobResults from "@/components/job-results";
import H1 from "@/components/ui/h1";
import { JobFilterValues } from "@/lib/validation";
import { Metadata } from "next";

interface PageProps {
  searchParams: {
    q?: string;
    type?: string;
    location?: string;
    remote?: string;
    onsite?: string;
    hybrid?: string;
    page?: string;
  };
}

function getTitle({
  q,
  type,
  location,
  remote,
  onsite,
  hybrid,
}: JobFilterValues) {
  const titlePrefix = q
    ? `${q} jobs`
    : type
      ? `${type} developer jobs`
      : remote || onsite || hybrid
        ? `${[
            ...(remote ? ["Remote"] : []),
            ...(onsite ? ["On-site"] : []),
            ...(hybrid ? ["Hybrid"] : []),
          ].join(", ")} developer jobs`
        : "All developer jobs";

  const titleSuffix = location ? ` in ${location}` : "";

  return `${titlePrefix}${titleSuffix}`;
}

export function generateMetadata({
  searchParams: { q, type, location, remote, onsite, hybrid },
}: PageProps): Metadata {
  return {
    title: `${getTitle({
      q,
      type,
      location,
      remote: remote === "true",
      onsite: onsite === "true",
      hybrid: hybrid === "true",
    })} | Pathwork`,
  };
}

export default async function Home({
  searchParams: { q, type, location, remote, onsite, hybrid, page },
}: PageProps) {
  const filteredValues: JobFilterValues = {
    q,
    type,
    location,
    remote: remote === "true",
    onsite: onsite === "true",
    hybrid: hybrid === "true",
  };

  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      {/* {JSON.stringify(jobs)} */}

      <div className="space-y-5 text-center">
        <H1>{getTitle(filteredValues)}</H1>

        <p className="text-muted-foreground">Forge your career path</p>
      </div>

      <section className="flex flex-col gap-5 md:flex-row">
        <JobFilterSidebar defaultValues={filteredValues} />
        <JobResults
          filterValues={filteredValues}
          page={page ? parseInt(page) : undefined}
        />
      </section>
    </main>
  );
}
