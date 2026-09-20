import styles from "./Table.module.css";

interface TableProps {
  headers: string[];
  rows: string[][];
  caption?: string;
  className?: string;
}

// edm-design-system.md §8-9 Table. PROJECT_SPEC §7 S10 — 개인정보 동의 모달에서만 사용.
export function Table({ headers, rows, caption, className }: TableProps) {
  return (
    <table className={[styles.table, className ?? ""].filter(Boolean).join(" ")}>
      {caption && <caption className={styles.caption}>{caption}</caption>}
      <thead>
        <tr>
          {headers.map((h) => (
            <th key={h} scope="col">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
