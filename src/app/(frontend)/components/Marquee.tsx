export default function Marquee({ items }: { items: string[] }) {
  if (!items.length) return null

  return (
    <div className="bg-wood text-cream py-4 overflow-hidden border-y border-wood/20 relative z-20">
      <div className="whitespace-nowrap flex w-[200%] animate-marquee">
        {[0, 1].map((group) => (
          <div
            key={group}
            className="flex items-center gap-8 px-4 w-1/2 justify-around font-serif italic tracking-wide text-sm md:text-base"
          >
            {items.map((item, i) => (
              <span key={i}>✦ {item}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
