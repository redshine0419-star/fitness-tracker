import Link from "next/link";
import { Picture } from "@/components/common/Picture";
import type { NavItem } from "@/content/types";
import styles from "./MegaMenu.module.css";

interface MegaMenuProps {
  item: NavItem;
  id: string;
}

// PROJECT_SPEC §7 S1 메가메뉴 패널 — 12컬럼 중 왼쪽 span 8(그룹 3열) / 오른쪽 span 4(프로모션 2개)
export function MegaMenu({ item, id }: MegaMenuProps) {
  return (
    <div id={id} role="group" aria-label={`${item.label} 하위 메뉴`} className={styles.panel}>
      <div className={`container ${styles.inner}`}>
        <div className="grid">
          <div className={styles.groups}>
            {item.groups.map((group) => (
              <div key={group.title} className={styles.group}>
                <p className={styles.groupTitle}>{group.title}</p>
                <ul className={styles.groupLinks}>
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className={styles.groupLink}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {item.promo.length > 0 && (
            <div className={styles.promoList}>
              {item.promo.map((promo) => (
                <Link key={promo.href} href={promo.href} className={styles.promoCard}>
                  <Picture image={promo.image} className={styles.promoImage} />
                  <span className={styles.promoTitle}>{promo.title}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
