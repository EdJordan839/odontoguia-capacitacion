import heroComienzo from "@/assets/yesiam/hero-comienzo.jpeg";

export function ShowitHero() {
  return (
    <section className="relative w-full bg-[#000000] text-white flex justify-center items-center overflow-hidden border-b border-black">
      <div className="w-full max-w-[1360px] mx-auto flex justify-center">
        <img
          src={heroComienzo}
          alt="COMIENZO — Porque la imagen no es vanidad. Es identidad. YES I'AM"
          className="w-full max-h-[85vh] sm:max-h-[90vh] object-contain object-center"
          fetchPriority="high"
        />
      </div>
    </section>
  );
}
