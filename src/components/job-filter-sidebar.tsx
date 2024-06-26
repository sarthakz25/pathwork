import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/select";
import prisma from "@/lib/prisma";
import { jobTypes } from "@/lib/job-types";
import { JobFilterValues, jobFilterSchema } from "@/lib/validation";
import { redirect } from "next/navigation";
import FormSubmitButton from "@/components/form-submit-button";

async function filterJobs(formData: FormData) {
  "use server";

  // console.log(formData.get("q") as string);

  // turn form values into js object
  const values = Object.fromEntries(formData.entries());

  const { q, type, location, remote, onsite, hybrid } =
    jobFilterSchema.parse(values);

  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: "true" }),
    ...(onsite && { onsite: "true" }),
    ...(hybrid && { hybrid: "true" }),
  });

  redirect(`/?${searchParams.toString()}`);
}

interface JobFilterSidebarProps {
  defaultValues: JobFilterValues;
}

export default async function JobFilterSidebar({
  defaultValues,
}: JobFilterSidebarProps) {
  const distinctLocations = (await prisma.job
    .findMany({
      where: { approved: true },
      select: { location: true },
      distinct: ["location"],
    })
    .then((locations) =>
      locations.map(({ location }) => location).filter(Boolean),
    )) as string[];

  return (
    <aside className="top-5 h-fit rounded-lg border bg-background p-4 md:sticky md:w-[275px]">
      <form action={filterJobs} key={JSON.stringify(defaultValues)}>
        <div className="space-y-5">
          <div className="flex flex-col gap-3">
            <Label htmlFor="q">Search</Label>
            <Input
              id="q"
              name="q"
              placeholder="Title, company, etc."
              defaultValue={defaultValues.q}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="type">Type</Label>
            <Select
              id="type"
              name="type"
              defaultValue={defaultValues.type || ""}
            >
              <option value="">All types</option>
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="location">Location</Label>
            <Select
              id="location"
              name="location"
              defaultValue={defaultValues.location || ""}
            >
              <option value="">All locations</option>
              {distinctLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex w-full flex-col space-y-2 md:flex-row md:space-x-1 md:space-y-0 lg:justify-center">
            <div className="flex items-center gap-1">
              <input
                id="remote"
                name="remote"
                type="checkbox"
                className="ml-[0.05rem] scale-110 accent-current"
                defaultChecked={defaultValues.remote}
              />
              <Label htmlFor="remote">Remote</Label>
            </div>
            <div className="flex items-center gap-1">
              <input
                id="onsite"
                name="onsite"
                type="checkbox"
                className="ml-[0.05rem] scale-110 accent-current"
                defaultChecked={defaultValues.onsite}
              />
              <Label htmlFor="onsite">On-site</Label>
            </div>
            <div className="flex items-center gap-1">
              <input
                id="hybrid"
                name="hybrid"
                type="checkbox"
                className="ml-[0.05rem] scale-110 accent-current"
                defaultChecked={defaultValues.hybrid}
              />
              <Label htmlFor="hybrid">Hybrid</Label>
            </div>
          </div>
          <FormSubmitButton className="w-full">Filter jobs</FormSubmitButton>
        </div>
      </form>
    </aside>
  );
}
