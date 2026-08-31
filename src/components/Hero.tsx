export default function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="pt-8">
      <p className="font-mono text-accent text-sm mb-5">Hi, my name is</p>
      <h2
        id="hero-heading"
        className="text-5xl md:text-6xl font-bold text-slate-lightest tracking-tight"
      >
        Inon Vinogradsky.
      </h2>
      <h3 className="mt-2 text-4xl md:text-5xl font-bold text-slate tracking-tight">
        I build things that automate themselves.
      </h3>
      <p className="mt-6 max-w-xl text-slate">
        This site pulls live data from my GitHub account so it stays current without me touching it.
        Scroll for repositories and language breakdown.
      </p>
    </section>
  )
}
