"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { TrackedLink } from "@/components/common/TrackedLink";
import { SearchIcon } from "@/components/icons/ds/SearchIcon";
import { siteConfig } from "@/content/site.config";
import { navItems } from "@/content/nav";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";
import styles from "./Header.module.css";

const OPEN_DELAY_MS = 100;

// PROJECT_SPEC §7 S1 Header — sticky, PC(>=1024) 메가메뉴 / Mobile·Tablet(<1024) 햄버거.
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 0);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenId(null);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  function scheduleOpen(label: string) {
    if (openTimer.current) clearTimeout(openTimer.current);
    openTimer.current = setTimeout(() => setOpenId(label), OPEN_DELAY_MS);
  }

  function closeMenu() {
    if (openTimer.current) clearTimeout(openTimer.current);
    setOpenId(null);
  }

  return (
    <header
      id="gnb"
      className={styles.header}
      data-scrolled={scrolled || undefined}
      onMouseLeave={closeMenu}
    >
      <div className={`container ${styles.bar}`}>
        <div className={styles.left}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoDot} aria-hidden="true" />
            {siteConfig.logo.wordmark}
          </Link>

          <nav aria-label="주요 메뉴" className={styles.desktopNav}>
            <ul className={styles.navList}>
              {navItems.map((item) => (
                <li
                  key={item.label}
                  className={styles.navItem}
                  onMouseEnter={() => scheduleOpen(item.label)}
                  onFocus={() => setOpenId(item.label)}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node)) closeMenu();
                  }}
                >
                  <TrackedLink
                    href={item.href}
                    className={styles.navLink}
                    data-label={item.label}
                    aria-expanded={openId === item.label}
                    aria-controls={`megamenu-${item.label}`}
                    trackCategory="header"
                    trackAction="gnb_click"
                    trackLabel={item.label}
                  >
                    {item.label}
                  </TrackedLink>
                  {openId === item.label && <MegaMenu item={item} id={`megamenu-${item.label}`} />}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={styles.utility}>
          <Link
            href="/coming-soon/search"
            className={styles.iconTrigger}
            aria-label="검색"
            data-track-cat="header"
            data-track-action="search_click"
            data-track-label="검색"
          >
            <SearchIcon />
          </Link>
          <Link
            href="/coming-soon/login"
            className={styles.loginLink}
            data-track-cat="header"
            data-track-action="login_click"
            data-track-label="로그인"
          >
            로그인
          </Link>
          <Button
            href="/donate"
            size="sm"
            className={styles.desktopOnly}
            data-track-cat="header"
            data-track-action="donate_click"
            data-track-label="후원하기"
            data-track-extra='{"cta_type":"donate"}'
          >
            후원하기
          </Button>
          <button
            type="button"
            className={styles.mobileMenuTrigger}
            aria-label="메뉴 열기"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <Menu width={24} height={24} aria-hidden="true" />
          </button>
        </div>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} items={navItems} />
    </header>
  );
}
