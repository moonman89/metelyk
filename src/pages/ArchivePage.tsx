import { catalog } from "@/data/catalog";

const archiveItems = [
  { num: "01", title: "Wuyi Oolong", detail: "Mineral heat / roasted depth" },
  { num: "02", title: "Phoenix Dan Cong", detail: "Floral lift / mountain fruit" },
  { num: "03", title: "Sheng Pu-er", detail: "Bright leaf / living storage" },
  { num: "04", title: "Shu Pu-er", detail: "Dark body / quiet earth" },
  { num: "05", title: "White Tea", detail: "Soft air / slow sweetness" },
  { num: "06", title: "Teaware Objects", detail: "Vessels for focused ritual" },
];

export function ArchivePage() {
  return (
    <section className="page-archive page-pad">
      <p className="section-label">
        <span>4</span> Archive
      </p>
      <h1 className="page-heading">Tea index / field notes / objects</h1>
      <p className="body-small manifesto-text">
        A working archive of leaves, vessels, origins, tastings, and brewing notes from the Metelyk house.
      </p>

      <div className="archive-table">
        {archiveItems.map((item) => (
          <article key={item.num} className="archive-row">
            <span>{item.num}</span>
            <h2>{item.title}</h2>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>

      <div className="archive-note">
        <p className="label-xs">Current collection</p>
        <p className="body-small">{catalog.products.length} teas / {catalog.categories.length} families / international inquiries open.</p>
      </div>
    </section>
  );
}
