"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CATEGORY_BAR_GAMES } from "@/data/games";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Header() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const mainNavItems = [
    { label: "Home", href: "/" },
    { label: "News", href: "/category/news" },
    { label: "Recap", href: "/category/recap" },
    { label: "Rankings", href: "/category/rankings" },
    { label: "Guides", href: "/category/guide" },
    { label: "Community", href: "/category/community" },
  ];

  return (
    <header className="border-b border-[var(--line)] sticky top-0 z-50 bg-[var(--header-bg)] backdrop-blur-md transition-colors">
      {/* Top Main Navigation Row (64px desktop, 56px mobile per Section 5) */}
      <div className="wrap flex items-center h-[56px] md:h-[64px] justify-between gap-6">
        <Link href="/" className="font-heading font-bold text-xl md:text-2xl text-[var(--ink)] flex-shrink-0 tracking-tight">
          Esport<span className="text-[var(--brand)]">Filter</span>
        </Link>

        {/* Desktop Main Navigation (Section 5 & 11: text-sm font-medium) */}
        <nav className="hidden md:flex gap-6 flex-1">
          {mainNavItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`text-sm py-1 border-b-2 transition-colors ${
                  isActive
                    ? "font-semibold text-[var(--ink)] border-[var(--brand)]"
                    : "font-medium text-[var(--ink-dim)] border-transparent hover:text-[var(--ink)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Header Actions */}
        <div className="flex items-center gap-3">
          {/* Search Trigger */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="icon-btn border border-[var(--line)] w-9 h-9 rounded-[6px] flex items-center justify-center cursor-pointer bg-transparent text-[var(--ink-dim)] hover:text-[var(--ink)] hover:border-[var(--brand)] transition-colors"
            aria-label="Search articles"
          >
            <svg className="w-4 h-4 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
          </button>

          {/* Theme Toggle Button */}
          <ThemeToggle />

          {/* Primary Action Button (Section 12: 40px height, 14px font-semibold, 6px radius) */}
          <button className="bg-[var(--brand)] text-white border-none h-[40px] px-4 rounded-[6px] font-semibold text-sm cursor-pointer hover:bg-[var(--brand-dark)] transition-colors font-sans hidden sm:block">
            Sign up free
          </button>
        </div>
      </div>


      {/* Search Input Bar Drawer */}
      {searchOpen && (
        <div className="border-t border-b border-[var(--line)] bg-[var(--bg-alt)] py-3">
          <div className="wrap flex items-center gap-3">
            <input
              type="text"
              placeholder="Search teams, players, tournaments or games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-[var(--bg)] border border-[var(--line)] px-3 py-2 text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--brand)]"
              autoFocus
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="text-xs font-semibold text-[var(--ink-dim)] hover:text-[var(--ink)] px-2"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Category / Game Navigation Bar */}
      <nav className="border-t border-[var(--line)] overflow-x-auto no-scrollbar" aria-label="Games filter">
        <ul className="flex list-none h-[40px] min-w-max">
          {CATEGORY_BAR_GAMES.map((game) => {
            const targetHref = game.slug === "all" ? "/" : `/game/${game.slug}`;
            const isActive =
              game.slug === "all"
                ? pathname === "/"
                : pathname === `/game/${game.slug}`;
            return (
              <li key={game.slug}>
                <Link
                  href={targetHref}
                  className={`flex items-center h-full px-3.5 text-[12.5px] font-semibold transition-colors border-r border-[var(--line)] ${
                    isActive
                      ? "bg-[var(--bg-alt)] text-[var(--ink)] border-b-2 border-b-[var(--brand)]"
                      : "text-[var(--ink-dim)] hover:bg-[var(--bg-alt)] hover:text-[var(--ink)]"
                  }`}
                >
                  {game.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
