import Link from "next/link";
import styles from "./PageHeader.module.css";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  breadcrumb: { label: string; href?: string }[];
}

// 서브페이지 공용 헤더 — PROJECT_SPEC에는 서브페이지 디자인 스펙이 없어(Phase 1은
// 메인 페이지만 정의) 메인 페이지와 같은 토큰·타이포그래피를 재사용해 일관된
// 배너 형태로 직접 구성했다.
export function PageHeader({ eyebrow, title, description, breadcrumb }: PageHeaderProps) {
  return (
    <div className={styles.header}>
      <div className="container">
        <nav aria-label="현재 위치" className={styles.breadcrumb}>
          <ol className={styles.breadcrumbList}>
            {breadcrumb.map((item, index) => (
              <li key={item.label} className={styles.breadcrumbItem}>
                {item.href ? <Link href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
                {index < breadcrumb.length - 1 && (
                  <span aria-hidden="true" className={styles.breadcrumbSeparator}>
                    /
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <p className={styles.eyebrow}>{eyebrow}</p>
        {/* h1은 layout.tsx의 시각적으로 숨긴 태그라인 1개뿐이라(§9), 서브페이지의
            시각적 제목은 h2로 둔다 (홈의 각 섹션 제목과 같은 규칙). */}
        <h2 className={`t-h1-bold ${styles.title}`}>{title}</h2>
        {description && <p className={`t-body1-regular ${styles.description}`}>{description}</p>}
      </div>
    </div>
  );
}
