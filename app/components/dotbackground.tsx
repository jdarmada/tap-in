export function DotBackground() {
  return (
    <div className="fixed inset-0 z-[-1] bg-black dark:bg-dot-black/[0.2] bg-dot-white/[0.2]">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white)]"></div>
    </div>
  );
}