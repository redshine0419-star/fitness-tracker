import { BookOpen, Building2, Mail, Store, Users } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { CarouselRightIcon } from "@/components/icons/ds/CarouselRightIcon";
import styles from "./QuickLinks.module.css";

type QuickLinkIcon = "book-open" | "mail" | "users" | "store" | "building";

interface QuickLinksProps {
  links: { icon: QuickLinkIcon; label: string; href: string }[];
}

const ICONS: Record<QuickLinkIcon, ReactNode> = {
  "book-open": <BookOpen width={24} height={24} aria-hidden="true" />,
  mail: <Mail width={24} height={24} aria-hidden="true" />,
  users: <Users width={24} height={24} aria-hidden="true" />,
  store: <Store width={24} height={24} aria-hidden="true" />,
  building: <Building2 width={24} height={24} aria-hidden="true" />,
};

// PROJECT_SPEC §7 S9 — 5개 항목. Desktop/Tablet은 5등분 그리드(세로 구분선),
// Mobile은 한 줄에 1개(구분선 + 우측 DS Right 아이콘).
export function QuickLinks({ links }: QuickLinksProps) {
  return (
    <nav aria-label="빠른 링크" className="container">
      <ul className={styles.list}>
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={styles.item}>
              <span className={styles.itemMain}>
                {ICONS[link.icon]}
                <span className="t-body1-bold">{link.label}</span>
              </span>
              <CarouselRightIcon className={styles.chevron} />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
