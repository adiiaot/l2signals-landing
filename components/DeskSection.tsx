import Link from 'next/link'
import DeskWidget from './DeskWidget'
import Reveal from './Reveal'

/**
 * The desk preview band, directly under the hero.
 *
 * The homepage argues in prose for three sections before it shows anything the
 * business actually made. This puts the work in front of the reader immediately
 * — as an interface, not a screenshot of a result — and it is the one place on
 * the page where something moves without being scrolled into view.
 */
export default function DeskSection() {
  return (
    <section id="desk" className="max-w-6xl mx-auto px-4 py-6 scroll-mt-20">
      <div className="card">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center">
          <div>
            <p className="text-[10px] sm:text-[11px] tracking-[0.16em] text-accent-gold uppercase">
              Inside the product
            </p>
            <h2 className="text-lg sm:text-xl font-bold mt-1">A working desk, not a deck.</h2>
            <p className="text-xs sm:text-sm text-text-secondary mt-3 leading-relaxed">
              A preview of the panel members open before the session: the instrument, the price, the levels either
              side of it and the clock the trade runs against — the same panel language the rest of the application
              uses.
            </p>
            <p className="text-xs sm:text-sm text-text-secondary mt-2 leading-relaxed">
              The software surfaces the setup. The order is placed by the member in their own terminal, so access
              never means control of an account — and nothing here trades on its own.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-2 mt-4">
              <Link href="/signals" className="btn-primary rounded-full px-5 py-2.5 text-xs justify-center">
                How the product works
              </Link>
              <Link href="/services" className="btn-secondary rounded-full px-5 py-2.5 text-xs justify-center">
                Build something like it
              </Link>
            </div>
          </div>

          <Reveal delay={0.08} amount={0.1}>
            <DeskWidget />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
