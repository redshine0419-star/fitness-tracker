import { Award, Globe, Handshake } from "lucide-react";
import type { ReactNode } from "react";
import { Picture } from "@/components/common/Picture";
import { VisuallyHidden } from "@/components/common/VisuallyHidden";
import { Button } from "@/components/ui/Button";
import type { Credential, ImageAsset } from "@/content/types";
import styles from "./TrustSection.module.css";

const ICONS: Record<Credential["icon"], ReactNode> = {
  globe: <Globe width={48} height={48} aria-hidden="true" />,
  award: <Award width={48} height={48} aria-hidden="true" />,
  handshake: <Handshake width={48} height={48} aria-hidden="true" />,
};

interface TrustSectionProps {
  intro: {
    image: ImageAsset;
    description: string;
    buttons: { label: string; href: string }[];
  };
  trust: { enabled: boolean; credentials: Credential[] };
}

// PROJECT_SPEC §7 S5 — S5-A(소개, 항상 노출) + S5-B(신뢰 지표 밴드, §16 결정에 따라
// 근거 자료가 확정되기 전까지 기본 숨김). 두 서브섹션을 한 컴포넌트 파일에서 다룬다
// (PROJECT_SPEC §4 디렉터리 구조가 이 섹션을 "TrustSection" 하나로만 명명함).
export function TrustSection({ intro, trust }: TrustSectionProps) {
  return (
    <>
      <section aria-labelledby="intro-heading" className={`container ${styles.introSection}`}>
        <VisuallyHidden as="h2" id="intro-heading">
          단체 소개
        </VisuallyHidden>
        <div className={`grid ${styles.introGrid}`}>
          <div className={styles.introImageWrap}>
            <Picture image={intro.image} className={styles.introImage} />
          </div>
          <div className={styles.introText}>
            <p className="t-h2-regular">
              {intro.description.split("\n").map((line, i) => (
                <span key={i} className={styles.introLine}>
                  {line}
                </span>
              ))}
            </p>
            <div className={styles.introButtons}>
              {intro.buttons.map((btn) => (
                <Button
                  key={btn.href + btn.label}
                  href={btn.href}
                  styleVariant="border"
                  color="gray"
                  data-track-cat="main_trust"
                  data-track-action="link_click"
                  data-track-label={btn.label}
                >
                  {btn.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {trust.enabled && (
        <section aria-label="신뢰 지표" className={styles.trustBand}>
          <div className={`container grid ${styles.trustGrid}`}>
            {trust.credentials.map((credential) => (
              <div key={credential.icon} className={styles.trustItem}>
                <span className={styles.trustIcon}>{ICONS[credential.icon]}</span>
                <p className="t-h5-bold">{credential.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
