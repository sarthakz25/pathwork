import JobFilterSidebar from "@/components/job-filter-sidebar";
import JobListItem from "@/components/job-list-item";
import H1 from "@/components/ui/h1";
import prisma from "@/lib/prisma";

export default async function Home() {
  const jobs = await prisma.job.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      {/* {JSON.stringify(jobs)} */}

      <div className="space-y-5 text-center">
        <H1>Developer Jobs</H1>

        <p className="text-muted-foreground">Find your dream job.</p>
      </div>

      <section className="flex flex-col gap-5 md:flex-row">
        <JobFilterSidebar />

        <div className="grow space-y-5">
          {jobs.map((job) => (
            <JobListItem job={job} key={job.id} />
          ))}
        </div>
      </section>
    </main>
  );
}
