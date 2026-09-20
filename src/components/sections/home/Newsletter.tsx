"use client";

import { useRef, useState } from "react";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Table } from "@/components/ui/Table";
import styles from "./Newsletter.module.css";

const INTERESTS = ["국내 소식", "해외 소식", "후원자 이야기"] as const;

interface FieldErrors {
  name?: string;
  email?: string;
  interests?: string;
  consent?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(name: string, email: string, interests: string[], consent: boolean): FieldErrors {
  const errors: FieldErrors = {};
  if (name.trim().length === 0) errors.name = "이름을 입력해 주세요.";
  if (!EMAIL_RE.test(email)) errors.email = "이메일 주소를 확인해 주세요. 예: name@example.com";
  if (interests.length === 0) errors.interests = "관심사를 1개 이상 선택해 주세요.";
  if (!consent) errors.consent = "신청하려면 개인정보 수집·이용에 동의해 주세요.";
  return errors;
}

// PROJECT_SPEC §7 S10 — 제출/blur 검증, 첫 오류 필드로 포커스, 성공 모달(저장 안 됨
// 문구 필수), 개인정보 동의 모달(Table, 값은 확정 전까지 {{TODO}}).
export function Newsletter() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [consentModalOpen, setConsentModalOpen] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const interestsRef = useRef<HTMLDivElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);

  function toggleInterest(label: string) {
    setInterests((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label],
    );
  }

  function focusFirstError(fieldErrors: FieldErrors) {
    if (fieldErrors.name) nameRef.current?.focus();
    else if (fieldErrors.email) emailRef.current?.focus();
    else if (fieldErrors.interests) interestsRef.current?.querySelector("input")?.focus();
    else if (fieldErrors.consent) consentRef.current?.focus();
  }

  function handleBlur(field: keyof FieldErrors) {
    const fieldErrors = validate(name, email, interests, consent);
    setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const fieldErrors = validate(name, email, interests, consent);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) {
      focusFirstError(fieldErrors);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, interests, consent }),
      });
      if (res.ok) {
        setSuccessOpen(true);
        setName("");
        setEmail("");
        setInterests([]);
        setConsent(false);
        setErrors({});
      } else {
        const data = (await res.json()) as { error?: string; field?: keyof FieldErrors };
        if (data.field) setErrors({ [data.field]: data.error });
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section aria-labelledby="newsletter-heading" className={`container grid ${styles.layout}`}>
      <div className={styles.intro}>
        <h2 id="newsletter-heading" className="t-h4-bold">
          뉴스레터 구독
        </h2>
        <p className="t-body2-regular">관심 있는 소식을 이메일로 받아보세요.</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.row}>
          <Input
            ref={nameRef}
            label="이름"
            size="md"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => handleBlur("name")}
            errorMessage={errors.name}
            containerClassName={styles.field}
          />
          <Input
            ref={emailRef}
            label="이메일"
            type="email"
            size="md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleBlur("email")}
            errorMessage={errors.email}
            containerClassName={styles.field}
          />
          <Button type="submit" size="md" disabled={submitting} className={styles.submitButton}>
            {submitting ? "신청 중..." : "신청하기"}
          </Button>
        </div>

        <div className={styles.checkboxRow} ref={interestsRef} role="group" aria-label="관심사">
          {INTERESTS.map((interest) => (
            <Checkbox
              key={interest}
              label={interest}
              checked={interests.includes(interest)}
              onChange={() => toggleInterest(interest)}
            />
          ))}
        </div>
        {errors.interests && <p className={styles.errorText}>{errors.interests}</p>}

        <div className={styles.consentRow}>
          <Checkbox
            ref={consentRef}
            label={
              <>
                개인정보 수집·이용에 동의합니다.{" "}
                <button type="button" className={styles.viewLink} onClick={() => setConsentModalOpen(true)}>
                  [보기]
                </button>
              </>
            }
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            onBlur={() => handleBlur("consent")}
          />
        </div>
        {errors.consent && <p className={styles.errorText}>{errors.consent}</p>}
      </form>

      <Modal
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        title="신청 화면이 정상 동작했습니다"
        actions={[{ label: "확인", variant: "primary", onClick: () => setSuccessOpen(false) }]}
      >
        <strong>테스트 화면입니다. 아직 신청 내용은 저장되지 않습니다.</strong>
      </Modal>

      <Modal
        open={consentModalOpen}
        onClose={() => setConsentModalOpen(false)}
        title="개인정보 수집·이용 동의"
        actions={[{ label: "닫기", variant: "border", onClick: () => setConsentModalOpen(false) }]}
      >
        <Table
          headers={["수집항목", "이용목적", "보유기간"]}
          rows={[["{{TODO}}", "{{TODO}}", "{{TODO}}"]]}
        />
      </Modal>
    </section>
  );
}
