"use client";

import { PenLine } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { PhotoPlatformIcon } from "@/components/icons/PhotoPlatformIcon";
import { VideoPlatformIcon } from "@/components/icons/VideoPlatformIcon";
import { Dropdown } from "@/components/ui/Dropdown";
import { footerEntities, footerLinks, relatedSites } from "@/content/footer";
import { siteConfig } from "@/content/site.config";
import styles from "./Footer.module.css";

// edm-design-system.md §8-12 Footer — PROJECT_SPEC §7 S11 (entities[]로 일반화).
export function Footer() {
  const [relatedSite, setRelatedSite] = useState<string | undefined>(undefined);

  return (
    <footer id="site-footer" className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <ul className={styles.linkList}>
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={link.accent ? styles.accentLink : styles.link}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className={styles.snsRow}>
            <div className={styles.snsIcons}>
              <a href={siteConfig.sns.youtube} className={styles.snsButton} aria-label="유튜브">
                <VideoPlatformIcon />
              </a>
              <a href={siteConfig.sns.blog} className={styles.snsButton} aria-label="블로그">
                <PenLine width={20} height={20} aria-hidden="true" />
              </a>
              <a href={siteConfig.sns.instagram} className={styles.snsButton} aria-label="인스타그램">
                <PhotoPlatformIcon />
              </a>
            </div>
            <Dropdown
              fixedWidth
              placeholder="관련 사이트"
              value={relatedSite}
              onChange={(value) => {
                setRelatedSite(value);
                const target = relatedSites.find((s) => s.value === value);
                if (target) window.location.href = target.href;
              }}
              options={relatedSites}
            />
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.entities}>
            {footerEntities.map((entity, index) => (
              <p key={index} className={styles.entityLine}>
                {entity.name} · 대표 {entity.representative} · 사업자등록번호 {entity.bizNo} ·{" "}
                {entity.address}
              </p>
            ))}
            {/* DS는 #999(--text-04)를 쓰지만 흰 배경 대비 약 2.9:1로 미달이라 --text-03으로 올림 (PROJECT_SPEC §5.5) */}
            <p className={styles.privacyNote}>
              {siteConfig.name}은(는) 이용자의 개인정보를 소중히 다룹니다. 자세한 내용은
              개인정보처리방침을 확인해 주세요.
            </p>
          </div>

          <div className={styles.contact}>
            <p className={styles.contactLabel}>고객센터</p>
            <p className={styles.contactPhone}>{siteConfig.contact.phone}</p>
            <p className={styles.contactHours}>{siteConfig.contact.hours}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
