import JobListItem from "@/components/job-list-item";
import prisma from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { JobFilterValues } from "@/lib/validation";
import { Prisma } from "@prisma/client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

interface JobResultsProps {
  filterValues: JobFilterValues;
  page?: number;
}

export default async function JobResults({
  filterValues,
  page = 1,
}: JobResultsProps) {
  const { q, type, location, remote, onsite, hybrid } = filterValues;

  const jobsPerPage = 7;
  const skip = (page - 1) * jobsPerPage;

  const searchString = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .map((word) => `%${word}%`);

  const searchFilter: Prisma.JobWhereInput = searchString?.length
    ? {
        OR: searchString.map((word) => ({
          OR: [
            { title: { contains: word, mode: "insensitive" } },
            { companyName: { contains: word, mode: "insensitive" } },
            { type: { contains: word, mode: "insensitive" } },
            { locationType: { contains: word, mode: "insensitive" } },
            { location: { contains: word, mode: "insensitive" } },
          ],
        })),
      }
    : {};

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      {
        OR: [
          remote ? { locationType: "Remote" } : {},
          onsite ? { locationType: "On-site" } : {},
          hybrid ? { locationType: "Hybrid" } : {},
        ],
      },
      { approved: true },
    ],
  };

  const jobsPromise = prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: jobsPerPage,
    skip,
  });

  const countPromise = prisma.job.count({ where });

  const [jobs, totalResults] = await Promise.all([jobsPromise, countPromise]);

  return (
    <div className="grow space-y-5">
      {jobs.map((job) => (
        <Link key={job.id} href={`/jobs/${job.slug}`} className="block">
          <JobListItem job={job} />
        </Link>
      ))}
      {jobs.length === 0 && (
        <p className="m-auto text-center font-medium">
          No jobs found. Try adjusting your search filters.
        </p>
      )}
      {jobs.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(totalResults / jobsPerPage)}
          filterValues={filterValues}
        />
      )}
    </div>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  filterValues: JobFilterValues;
}

function Pagination({
  currentPage,
  totalPages,
  filterValues: { q, type, location, remote, onsite, hybrid },
}: PaginationProps) {
  function generatePageLink(page: number) {
    const searchParams = new URLSearchParams({
      ...(q && { q }),
      ...(type && { type }),
      ...(location && { location }),
      ...(remote && { remote: "true" }),
      ...(onsite && { onsite: "true" }),
      ...(hybrid && { hybrid: "true" }),
      page: page.toString(),
    });

    return `/?${searchParams.toString()}`;
  }

  return (
    <div className="flex justify-between">
      <Link
        href={generatePageLink(currentPage - 1)}
        className={cn(
          "flex items-center gap-1 font-medium",
          currentPage <= 1 && "invisible",
        )}
      >
        <ArrowLeft size={16} />
        Prev
      </Link>
      <span className="font-medium">
        Page {currentPage} of {totalPages}
      </span>
      <Link
        href={generatePageLink(currentPage + 1)}
        className={cn(
          "flex items-center gap-1 font-medium",
          currentPage >= totalPages && "invisible",
        )}
      >
        Next
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
