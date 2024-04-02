import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-5xl space-y-5 px-3 py-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Pathwork</h3>
            <p className="text-sm text-muted-foreground">
              Crafting Professional Paths
            </p>
          </div>

          <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
            <Link href="/about" className="hover:underline">
              About Us
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms
            </Link>
          </div>
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
