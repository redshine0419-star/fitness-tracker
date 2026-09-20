import styles from "./SkipNav.module.css";

// PROJECT_SPEC §9 — Skip link 3개(메뉴/본문/푸터). 포커스 시에만 보인다.
export function SkipNav() {
  return (
    <nav aria-label="바로가기" className={styles.skipNav}>
      <a href="#gnb" className={styles.link}>
        메뉴로 바로가기
      </a>
      <a href="#main-content" className={styles.link}>
        본문으로 바로가기
      </a>
      <a href="#site-footer" className={styles.link}>
        푸터로 바로가기
      </a>
    </nav>
  );
}
