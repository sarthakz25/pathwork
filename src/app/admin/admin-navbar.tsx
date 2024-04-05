"use client";

import { useClerk } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminNavbar() {
  const { user, signOut } = useClerk();
  const router = useRouter();

  return (
    <div className="border bg-muted px-3">
      <div className="m-auto flex h-10 max-w-5xl items-center justify-between">
        <Link
          href="/admin"
          className="bg-gradient-to-r from-indigo-500 to-cyan-600 bg-clip-text font-bold text-transparent"
        >
          Admin
        </Link>
        <div className="flex items-center space-x-3">
          <span className="text-sm font-semibold text-muted-foreground">
            {user?.primaryEmailAddress?.emailAddress}
          </span>
          <button
            onClick={async () => {
              await signOut();
              router.push("/");
            }}
            className="rounded-md border bg-primary-foreground p-[0.325rem] transition hover:bg-muted-foreground/25"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
