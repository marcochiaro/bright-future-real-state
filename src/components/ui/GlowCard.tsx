interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export function GlowCard({ children, className = "", glowColor }: GlowCardProps) {
  return (
    <div
      className={`glow-card p-6 ${className}`}
      style={glowColor ? { borderColor: glowColor + "40", ["--glow" as string]: glowColor } : undefined}
    >
      {children}
    </div>
  );
}
