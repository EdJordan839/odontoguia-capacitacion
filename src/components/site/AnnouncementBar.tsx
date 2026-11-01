export const ANNOUNCEMENTS = [
  "YES I'AM · Consultoría de Imagen & Marca Personal",
  "Donde tu presencia se convierte en autoridad y tu marca en legado",
  "Asesorías presenciales en Chihuahua y virtuales a todo el mundo",
  "Agenda tu sesión de diagnóstico inicial por WhatsApp: +52 614 187 9067",
];

function Track({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden}>
      {ANNOUNCEMENTS.map((text) => (
        <li
          key={text}
          className="flex items-center whitespace-nowrap px-6 text-[0.72rem] font-medium tracking-widest uppercase sm:text-xs"
        >
          <span>{text}</span>
          <span className="ml-12 opacity-50" aria-hidden>
            ✦
          </span>
        </li>
      ))}
    </ul>
  );
}

export function AnnouncementBar() {
  return (
    <div
      className="marquee relative z-50 h-[var(--announce-h)] overflow-hidden bg-obsidian text-cream border-b border-cream/10"
      aria-label="Anuncios"
    >
      <div className="marquee-track flex h-full w-max items-center">
        <Track />
        <Track hidden />
      </div>
    </div>
  );
}
