export default function LightRays() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Left Ray */}
      <div className="ray ray-left" />

      {/* Center Ray */}
      <div className="ray ray-center" />

      {/* Right Ray */}
      <div className="ray ray-right" />

      {/* Grain */}
      <div className="grain" />

      {/* Vignette */}
      <div className="vignette" />
    </div>
  );
}