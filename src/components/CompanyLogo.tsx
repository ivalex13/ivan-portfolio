/**
 * Inline monochrome company logomarks for the experience section and
 * case study cards. Marks inherit the surrounding text color
 * (currentColor) so they adapt to both themes. Keyed by the `company`
 * field in content.ts — companies without a mark here simply render
 * nothing.
 */

const marks: Record<
  string,
  { viewBox: string; paths: { d: string; evenOdd?: boolean }[] }
> = {
  zendesk: {
    viewBox: "0 0 24 24",
    paths: [
      {
        d: "M12.914 2.904V16.29L24 2.905H12.914zM0 2.906C0 5.966 2.483 8.45 5.543 8.45s5.542-2.484 5.543-5.544H0zm11.086 4.807L0 21.096h11.086V7.713zm7.37 7.84c-3.063 0-5.542 2.48-5.542 5.543H24c0-3.06-2.48-5.543-5.543-5.543z",
      },
    ],
  },
  instapage: {
    viewBox: "0 0 32 32",
    paths: [
      {
        d: "M7.9448 28.6419V3.11731C7.9448 2.84382 7.76254 2.66151 7.58027 2.66151L5.93988 2.38803C5.66649 2.38803 5.3931 2.57034 5.3931 2.84382V28.8243C5.3931 29.1889 5.66649 29.3712 5.93988 29.3712L7.48914 29.1889C7.76254 29.0977 7.9448 28.9154 7.9448 28.6419Z",
      },
      {
        d: "M3.47926 26.2718V5.39626C3.47926 5.12278 3.297 4.94047 3.02361 4.94047L1.47434 4.75816C1.20095 4.75816 0.927551 4.94047 0.927551 5.21395V26.4541C0.927551 26.7276 1.20095 27.001 1.47434 26.9099L3.02361 26.7276C3.297 26.7276 3.47926 26.5452 3.47926 26.2718Z",
      },
      {
        d: "M30.1812 3.29961L10.4054 0.0178823C10.132 -0.0732806 9.85858 0.200199 9.85858 0.473678V31.4679C9.85858 31.7414 10.132 32.0148 10.4054 31.9237L30.1812 28.4596C30.3634 28.4596 30.5457 28.1861 30.5457 28.0038V3.7554C30.5457 3.48192 30.3634 3.29961 30.1812 3.29961ZM28.0851 25.816C28.0851 26.0895 27.9028 26.2718 27.7206 26.2718L13.7773 28.2773C13.5039 28.2773 13.2305 28.095 13.2305 27.8215V4.57586C13.2305 4.30237 13.5039 4.02889 13.7773 4.12006L27.7206 5.8521C27.994 5.8521 28.1763 6.12554 28.1763 6.30789V25.816H28.0851Z",
        evenOdd: true,
      },
    ],
  },
};

export function hasCompanyMark(company: string) {
  return company.toLowerCase() in marks;
}

export default function CompanyLogo({
  company,
  className,
}: {
  company: string;
  className?: string;
}) {
  const mark = marks[company.toLowerCase()];
  if (!mark) return null;
  return (
    <svg
      viewBox={mark.viewBox}
      className={className}
      fill="currentColor"
      aria-hidden
    >
      {mark.paths.map((p, i) => (
        <path
          key={i}
          d={p.d}
          fillRule={p.evenOdd ? "evenodd" : undefined}
          clipRule={p.evenOdd ? "evenodd" : undefined}
        />
      ))}
    </svg>
  );
}
