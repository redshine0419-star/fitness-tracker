import type { JsonLdObject } from "@/lib/jsonld";

// `</script>` 조기 종료를 막기 위해 '<'만 이스케이프한다 (내용은 전부 내부 설정값).
export function JsonLd({ data }: { data: JsonLdObject }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
