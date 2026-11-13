"use client";

import { useState } from "react";
import Link from "next/link";
import { FOOTER_NAV } from "@/lib/site";

/**
 * Footer link columns. On phones each column folds into an accordion row:
 * tap the heading to open its links, one group at a time. Desktop is unchanged.
 */
export default function FooterNav() {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <nav className="fnav" aria-label="Footer">
      <ul className="fnav--menu flex flex-c-wrap flex-sp-block">
        {FOOTER_NAV.map((group) => {
          const open = openKey === group.key;
          const listId = `fnav-${group.key}`;
          // the heading row toggles on phones, so keep its own page reachable from the list
          const hasOwnPage = group.children?.some((child) => child.href === group.href);

          return (
            <li key={group.key} className={`menu-item menu-item-has-children ${open ? "is-open" : ""}`}>
              <Link href={group.href}>{group.label}</Link>
              <button
                type="button"
                className="fnav--toggle"
                aria-expanded={open}
                aria-controls={listId}
                onClick={() => setOpenKey(open ? null : group.key)}
              >
                <span className="fnav--toggle-txt">{group.label}</span>
                <span className="fnav--icon" aria-hidden="true"></span>
              </button>
              <ul id={listId} className="sub-menu">
                {!hasOwnPage && (
                  <li className="fnav--all">
                    <Link href={group.href}>View all</Link>
                  </li>
                )}
                {group.children?.map((child) => (
                  <li key={child.label}>
                    <Link href={child.href}>{child.label}</Link>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
