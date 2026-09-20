import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// PROJECT_SPEC §7 S10 — mock: 검증만 하고 200을 반환한다. 이름·이메일 등 개인정보를
// 저장하거나 외부로 전송하지 않는다 (§2-8).
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const { name, email, interests, consent } = (body ?? {}) as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json({ error: "이름을 입력해 주세요.", field: "name" }, { status: 400 });
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "이메일 주소를 확인해 주세요. 예: name@example.com", field: "email" },
      { status: 400 },
    );
  }
  if (!Array.isArray(interests) || interests.length === 0) {
    return NextResponse.json(
      { error: "관심사를 1개 이상 선택해 주세요.", field: "interests" },
      { status: 400 },
    );
  }
  if (consent !== true) {
    return NextResponse.json(
      { error: "신청하려면 개인정보 수집·이용에 동의해 주세요.", field: "consent" },
      { status: 400 },
    );
  }

  return NextResponse.json({ ok: true });
}
