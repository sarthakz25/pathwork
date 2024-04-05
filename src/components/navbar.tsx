import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";
import ThemeToggleButton from "@/components/theme-toggle-button";

export default function Navbar() {
  return (
    <header className="shadow-sm dark:shadow-primary/5">
      <nav className="m-auto flex max-w-5xl items-center justify-between px-3 py-5">
        <Link href="/" className="flex items-center gap-3">
          <Image src={logo} width={40} height={40} alt="Pathwork logo" />
          <span className="text-xl font-bold tracking-tight">Pathwork</span>
        </Link>
        <div className="flex items-center space-x-3">
          <ThemeToggleButton />
          <Button asChild>
            <Link href="/jobs/new">Post a job</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
