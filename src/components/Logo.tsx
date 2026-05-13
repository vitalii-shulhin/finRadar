interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`font-heading font-bold ${className}`}>
      <span className="text-white">Fin</span>
      <span className="text-primary">Radar</span>
    </div>
  );
}
