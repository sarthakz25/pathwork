import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-5xl space-y-2 px-3 py-5">
        <div className="flex flex-row items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            Crafting Professional Paths
          </p>
          <Link
            href="/terms"
            className="text-sm text-muted-foreground hover:underline"
          >
            Terms
          </Link>
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
