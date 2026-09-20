"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import { Badge01 } from "@/components/ui/Badge01";
import { Banner, Card } from "@/components/ui/Card";
import {
  CarouselIndicatorPill,
  CarouselMobilePill,
  CarouselPcControls,
  PlusButton,
} from "@/components/ui/CarouselControls";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Dropdown } from "@/components/ui/Dropdown";
import { IconButton } from "@/components/ui/IconButton";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Tab01 } from "@/components/ui/Tab01";
import { Table } from "@/components/ui/Table";
import { SearchIcon } from "@/components/icons/ds/SearchIcon";
import type { ImageAsset } from "@/content/types";
import styles from "./catalog.module.css";

const demoImage: ImageAsset = {
  pc: "/placeholder/gray.svg",
  alt: "",
  width: 640,
  height: 400,
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.sectionBody}>{children}</div>
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className={styles.row}>
      <span className={styles.rowLabel}>{label}</span>
      <div className={styles.rowContent}>{children}</div>
    </div>
  );
}

// PROJECT_SPEC §4 — 컴포넌트 카탈로그. noindex + 프로덕션에서는 404로 막는다.
// (Next.js는 라우트 단위로 "빌드 자체에서 제외"하는 표준 방법을 제공하지 않아,
//  런타임에 notFound()로 막는 방식을 택함 — docs/DEVIATIONS.md 참고)
// 훅 순서 규칙을 지키기 위해 이 게이트는 훅이 없는 별도 컴포넌트로 분리한다.
export default function ComponentCatalogPageGate() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }
  return <ComponentCatalogPage />;
}

function ComponentCatalogPage() {
  const [tabId, setTabId] = useState("a");
  const [dropdownValue, setDropdownValue] = useState<string | undefined>(undefined);
  const [checked, setChecked] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [pcIndex, setPcIndex] = useState(1);
  const [playing, setPlaying] = useState(true);

  return (
    <main className={styles.page}>
      <div className="container">
        <h1 className={styles.pageTitle}>컴포넌트 카탈로그 (dev 전용, noindex)</h1>

        <Section title="Button — style × color × size × shape">
          <Row label="Filled / color">
            <Button color="primary">정기후원 신청하기</Button>
            <Button color="secondary">자세히 보기</Button>
            <Button color="gray">닫기</Button>
          </Row>
          <Row label="Border / color">
            <Button styleVariant="border" color="primary">
              캠페인 자세히 보기
            </Button>
            <Button styleVariant="border" color="secondary">
              연차보고서 보기
            </Button>
            <Button styleVariant="border" color="gray">
              재정 보고 보기
            </Button>
            <span className={styles.darkSwatch}>
              <Button styleVariant="border" color="white">
                후원하기
              </Button>
            </span>
          </Row>
          <Row label="Size">
            <Button size="2xs">2X-small</Button>
            <Button size="xs">X-small</Button>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </Row>
          <Row label="Shape">
            <Button shape="square">Square</Button>
            <Button shape="round">Round</Button>
          </Row>
          <Row label="State">
            <Button>Default</Button>
            <Button disabled>Disabled</Button>
          </Row>
        </Section>

        <Section title="Input — size × state">
          <Row label="Size">
            <Input size="sm" placeholder="Small" aria-label="Small input" />
            <Input size="md" placeholder="Medium" aria-label="Medium input" />
            <Input size="lg" placeholder="Large" aria-label="Large input" />
          </Row>
          <Row label="State">
            <Input placeholder="Default" aria-label="Default" />
            <Input defaultValue="입력완료" aria-label="Completed" />
            <Input disabled placeholder="Disabled" aria-label="Disabled" />
            <Input
              errorMessage="이메일 주소를 확인해 주세요. 예: name@example.com"
              defaultValue="invalid-email"
              aria-label="Error"
            />
          </Row>
        </Section>

        <Section title="Dropdown (Medium)">
          <Row label="관련 사이트">
            <Dropdown
              placeholder="선택해 주세요"
              value={dropdownValue}
              onChange={setDropdownValue}
              options={[
                { label: "블로그", value: "blog" },
                { label: "온라인 스토어", value: "store" },
                { label: "채용", value: "career" },
              ]}
            />
          </Row>
          <Row label="Footer 고정폭 (PC 260 / Mobile 152)">
            <Dropdown
              fixedWidth
              placeholder="관련 사이트"
              value={dropdownValue}
              onChange={setDropdownValue}
              options={[
                { label: "블로그", value: "blog" },
                { label: "온라인 스토어", value: "store" },
              ]}
            />
          </Row>
        </Section>

        <Section title="Checkbox">
          <Row label="Default / Selected">
            <Checkbox label="국내 소식" />
            <Checkbox label="해외 소식" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
          </Row>
          <Row label="Mobile size">
            <Checkbox size="mobile" label="후원자 이야기" />
          </Row>
        </Section>

        <Section title="Tab01 (Pill)">
          <Row label="Active / Default">
            <Tab01
              aria-label="예시 탭"
              activeId={tabId}
              onChange={setTabId}
              items={[
                { id: "a", label: "새 소식" },
                { id: "b", label: "활동 이야기" },
                { id: "c", label: "후원자 이야기" },
              ]}
            />
          </Row>
        </Section>

        <Section title="Badge01">
          <Row label="Border / Filled-Gray">
            <Badge01 variant="border">캠페인</Badge01>
            <Badge01 variant="filled-gray">공지사항</Badge01>
          </Row>
        </Section>

        <Section title="Card (default / compact) + Banner">
          <Row label="Default">
            <div className={styles.cardSlot}>
              <Card
                href="/coming-soon"
                image={demoImage}
                eyebrow={<Badge01 variant="border">캠페인</Badge01>}
                title="식수 위생 개선 사업"
                description="깨끗한 물이 없는 지역에 우물과 위생 시설을 지어 아동 건강을 지킵니다."
              />
            </div>
          </Row>
          <Row label="Compact">
            <div className={styles.compactSlot}>
              <Card
                href="/coming-soon"
                variant="compact"
                image={demoImage}
                title="여름 캠프 활동 소식"
              />
            </div>
          </Row>
          <Row label="Banner">
            <Banner
              href="/coming-soon"
              image={demoImage}
              overlayText={<span className="t-h4-bold">함께 만드는 좋은 변화</span>}
            />
          </Row>
        </Section>

        <Section title="Carousel 컨트롤 (pc / mobile / indicator / Plus)">
          <Row label="Carousel_pc">
            <CarouselPcControls
              current={pcIndex}
              total={3}
              playing={playing}
              onPrev={() => setPcIndex((i) => (i === 1 ? 3 : i - 1))}
              onNext={() => setPcIndex((i) => (i === 3 ? 1 : i + 1))}
              onTogglePlay={() => setPlaying((v) => !v)}
              labelPrefix="예시 배너"
            />
          </Row>
          <Row label="Carousel_mobile pill">
            <CarouselMobilePill current={2} total={5} />
          </Row>
          <Row label="인디케이터 pill">
            <CarouselIndicatorPill
              current={1}
              total={4}
              onPrev={() => {}}
              onNext={() => {}}
              labelPrefix="캠페인"
            />
          </Row>
          <Row label="Plus 버튼">
            <PlusButton href="/coming-soon" aria-label="더보기" />
          </Row>
        </Section>

        <Section title="IconButton (컨트롤러 원형)">
          <Row label="44 / 48">
            <IconButton icon={<SearchIcon />} aria-label="검색" size={44} />
            <IconButton icon={<SearchIcon />} aria-label="검색" size={48} />
          </Row>
        </Section>

        <Section title="Modal">
          <Row label="열기">
            <Button onClick={() => setModalOpen(true)}>모달 열기</Button>
            <Modal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              title="신청 화면이 정상 동작했습니다"
              actions={[
                { label: "닫기", variant: "border", onClick: () => setModalOpen(false) },
                { label: "확인", variant: "primary", onClick: () => setModalOpen(false) },
              ]}
            >
              테스트 화면입니다. 아직 신청 내용은 저장되지 않습니다.
            </Modal>
          </Row>
        </Section>

        <Section title="Table">
          <Table
            headers={["수집항목", "이용목적", "보유기간"]}
            rows={[["{{TODO}}", "{{TODO}}", "{{TODO}}"]]}
          />
        </Section>
      </div>
    </main>
  );
}
