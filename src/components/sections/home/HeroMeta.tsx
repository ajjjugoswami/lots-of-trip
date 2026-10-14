import styles from "./HeroMeta.module.css";

export function HeroMeta() {
  return (
    <div data-hero-fade className="hidden items-center gap-6 md:col-span-5 md:flex">
      <span className={styles.scrollLine} aria-hidden />
      <div className="eyebrow space-y-1.5 text-snow/70">
        <p>Key Monastery · Spiti · 4,166 m</p>
        <p>32.2976° N · 78.0119° E</p>
      </div>
    </div>
  );
}
