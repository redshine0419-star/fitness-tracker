import { siteConfig } from "@/content/site.config";

// PROJECT_SPEC §11 — 값이 '{{TODO}}'인 필드는 JSON-LD 출력에서 제외한다
// (플레이스홀더를 구조화 데이터로 내보내지 않는다).
const TODO = "{{TODO}}";

type JsonLdValue =
  | string
  | number
  | boolean
  | JsonLdObject
  | JsonLdValue[]
  | undefined;
export interface JsonLdObject {
  [key: string]: JsonLdValue;
}

function omitTodo(input: JsonLdObject): JsonLdObject {
  const out: JsonLdObject = {};
  for (const [key, value] of Object.entries(input)) {
    if (value === undefined || value === TODO) continue;
    if (Array.isArray(value)) {
      out[key] = value;
      continue;
    }
    if (typeof value === "object" && value !== null) {
      const nested = omitTodo(value);
      if (Object.keys(nested).length > 0) out[key] = nested;
      continue;
    }
    out[key] = value;
  }
  return out;
}

export function organizationJsonLd(): JsonLdObject {
  return omitTodo({
    "@context": "https://schema.org",
    "@type": ["Organization", "NGO"],
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: siteConfig.logo.src,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
  });
}

export function websiteJsonLd(): JsonLdObject {
  return omitTodo({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    inLanguage: "ko-KR",
    publisher: { "@id": `${siteConfig.url}/#organization` },
  });
}

export function webPageJsonLd(params: {
  url: string;
  title: string;
  description: string;
}): JsonLdObject {
  return omitTodo({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${params.url}#webpage`,
    url: params.url,
    name: params.title,
    description: params.description,
    inLanguage: "ko-KR",
    isPartOf: { "@id": `${siteConfig.url}/#website` },
  });
}
