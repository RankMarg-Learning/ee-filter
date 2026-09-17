"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export interface DropdownLink {
  label: string;
  href: string;
  badge?: string;
  date?: string;
}

export interface DropdownGroup {
  title: string;
  links: DropdownLink[];
  viewAll?: { label: string; href: string };
}

export interface NavItem {
  label: string;
  type?: "link" | "dropdown";
  layout?: "columns" | "stacked";
  href?: string;
  groups?: DropdownGroup[];
}

export interface CategoryItem {
  name: string;
  slug: string;
  key?: string;
}

export interface HeaderProps {
  mainNavItems?: NavItem[];
  categoryNavItems?: CategoryItem[];
}

export function Header({ mainNavItems = [], categoryNavItems = [] }: HeaderProps) {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
            const isDropdown = item.type === "dropdown";

            if (!isDropdown) {
              const href = item.href || "#";
              const isActive =
                pathname === href ||
                (href !== "/" && href !== "#" && pathname.startsWith(href));

              return (
                <Link
                  key={item.label}
                  href={href}
                  className={`text-sm border-b-2 transition-colors flex items-center h-full ${isActive
                    ? "font-semibold text-[var(--ink)] border-[var(--brand)]"
                    : "font-medium text-[var(--ink-dim)] border-transparent hover:text-[var(--ink)]"
                    }`}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <div key={item.label} className="relative group flex items-center h-full">
                <button className="text-sm font-medium text-[var(--ink-dim)] group-hover:text-[var(--ink)] transition-colors flex items-center gap-1 cursor-default border-b-2 border-transparent h-full">
                  {item.label}
                  <ChevronDown size={14} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                </button>

                {/* Dropdown Container */}
                <div className="absolute top-full left-0 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="bg-[var(--bg)] border border-[var(--line)] rounded-lg shadow-xl p-5 flex gap-8 min-w-[400px]">

                    {/* Standard Dropdown Groups */}
                    <div className={`w-full flex gap-4 ${item.layout === 'stacked' ? 'flex-col' : 'flex-wrap'}`}>
                      {item.groups?.map((group, idx) => (
                        <div key={idx} className={item.layout === 'stacked' ? 'w-full' : 'flex-1 min-w-[200px]'}>
                          <h4 className="text-xs font-bold text-[var(--ink-dim)] uppercase tracking-wider mb-4">{group.title}</h4>
                          <ul className="flex flex-col gap-1">
                            {group.links?.map((link, lIdx) => (
                              <li key={lIdx}>
                                <Link href={link.href || "#"} className="group/link flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 px-2 py-1.5 -mx-2 rounded-md hover:bg-[var(--bg-alt)] transition-colors">
                                  <span className="text-[13px] font-medium text-[var(--ink)] group-hover/link:text-[var(--brand)] transition-colors line-clamp-1" title={link.label}>
                                    {link.label}
                                  </span>
                                  <div className="flex-shrink-0 flex items-center gap-2">
                                    {link.badge && (
                                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wide ${link.badge.toLowerCase() === 'ongoing' || link.badge.toLowerCase() === 'live'
                                        ? 'bg-red-500/10 text-red-500'
                                        : 'bg-[var(--line)] text-[var(--ink-dim)]'
                                        }`}>
                                        {link.badge}
                                      </span>
                                    )}
                                    {link.date && <span className="text-[11px] font-medium text-[var(--ink-dim)] whitespace-nowrap">{link.date}</span>}
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </ul>

                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        {/* Header Actions */}
        <div className="flex items-center gap-3">


          {/* Theme Toggle Button */}
          <ThemeToggle />


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
          {categoryNavItems.map((game) => {
            const targetHref = game.slug === "all" ? "/" : `/game/${game.slug}`;
            const isActive =
              game.slug === "all"
                ? pathname === "/"
                : pathname === `/game/${game.slug}`;
            return (
              <li key={game.slug}>
                <Link
                  href={targetHref}
                  className={`flex items-center h-full px-3.5 text-[12.5px] font-semibold transition-colors border-r border-[var(--line)] ${isActive
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
