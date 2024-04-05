import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-5xl space-y-2 px-3 py-5">
        <div className="flex flex-row items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            Crafting Professional Paths
          </p>
          <Popover>
            <PopoverTrigger>
              <span className="text-sm text-muted-foreground hover:underline">
                Terms
              </span>
            </PopoverTrigger>
            <PopoverContent>
              <div className="p-2.5 text-sm">
                <p className="mb-1.5 font-medium text-primary/75">
                  Welcome to Pathwork! By using our services, you agree to the
                  following terms:
                </p>
                <ul className="space-y-1 font-normal text-primary/50">
                  <li>
                    No illegal, dangerous, or discriminatory job postings.
                  </li>
                  <li>We reserve the right to remove inappropriate content.</li>
                  <li>
                    Your data is secure, and we will not share it without
                    permission.
                  </li>
                </ul>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="text-sm">
          <a
            href="https://github.com/sarthakz25"
            target="_blank"
            rel="noopener noreferrer"
          >
            &copy; {new Date().getFullYear()} Sarthak Khandelwal
          </a>
        </div>
      </div>
    </footer>
  );
}
