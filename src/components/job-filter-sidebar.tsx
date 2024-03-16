import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/select";
import prisma from "@/lib/prisma";

async function filterJobs(formData: FormData) {
  "use server";
}

export default async function JobFilterSidebar() {
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
    <aside className="sticky top-5 h-fit rounded-lg border bg-background p-4 md:w-[250px]">
      <form action={filterJobs}>
        <div className="space-y-5">
          <div className="flex flex-col gap-3">
            <Label htmlFor="q">Search</Label>
            <Input id="q" name="q" placeholder="Title, company, etc." />
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="location">Location</Label>
            <Select id="location" name="location" defaultValue="">
              <option value="">All locations</option>
              {distinctLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </form>
    </aside>
  );
}
