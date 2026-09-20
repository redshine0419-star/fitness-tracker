import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import styles from "./coming-soon.module.css";

export const metadata: Metadata = {
  title: "준비 중입니다",
  robots: { index: false, follow: false },
};

interface ComingSoonPageProps {
  params: Promise<{ slug?: string[] }>;
}

// PROJECT_SPEC §1.4 — Phase 1의 GNB·푸터 하위 링크는 전부 이 stub으로 연결한다 (noindex).
export default async function ComingSoonPage({ params }: ComingSoonPageProps) {
  const { slug } = await params;

  return (
    <div className={`container ${styles.wrap}`}>
      <p className={styles.eyebrow}>준비 중</p>
      <h1 className={styles.title}>더 나은 화면으로 준비하고 있습니다</h1>
      <p className={styles.description}>
        요청하신 페이지{slug && slug.length > 0 ? ` (${slug.join(" / ")})` : ""}는 아직 준비
        중입니다. 곧 만나보실 수 있도록 준비하겠습니다.
      </p>
      <Button href="/" shape="square">
        홈으로 돌아가기
      </Button>
    </div>
  );
}
