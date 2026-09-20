import React from "react";
import Link from "next/link";
import { Author } from "@/types/article";

interface AuthorBoxProps {
  author: Author;
}

export function AuthorBox({ author }: AuthorBoxProps) {
  const authorSlug = author.name.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex gap-4 p-5 bg-[var(--bg-alt)] border border-[var(--line)] mt-2 font-sans">
      <Link href={`/author/${authorSlug}`}>
        <img
          src={author.avatarUrl || "/profile-dp.png"}
          alt={author.name}
          className="w-16 h-16 rounded-full object-cover flex-shrink-0 hover:opacity-90 transition-opacity"
        />
      </Link>
      <div>
        <h4 className="text-[15px] font-bold text-[var(--ink)] mb-1 font-sans">
          <Link href={`/author/${authorSlug}`} className="hover:text-[var(--brand)] transition-colors">
            {author.name}
          </Link>
        </h4>
        <p className="text-[13px] text-[var(--ink-dim)] leading-relaxed">
          {author.bio ||
            "Writer covering esports tournaments, player rosters, and game balance updates across major competitive circuits."}
        </p>
      </div>
    </div>
  );
}
