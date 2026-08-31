import Sidebar from './components/Sidebar'
import Hero from './components/Hero'
import About from './components/About'
import Repos from './components/Repos'
import Languages from './components/Languages'
import Resume from './components/Resume'
import Contact from './components/Contact'

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'repos', label: 'Repositories' },
  { id: 'languages', label: 'Languages' },
  { id: 'resume', label: 'Résumé' },
  { id: 'contact', label: 'Contact' },
]

function App() {
  return (
    <div className="min-h-screen bg-navy text-slate-light">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-accent focus:text-navy focus:px-3 focus:py-2 focus:font-mono focus:text-sm focus:rounded"
      >
        Skip to content
      </a>
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-24 lg:grid lg:grid-cols-[300px_1fr] lg:gap-16">
        <Sidebar sections={SECTIONS} />
        <main id="main" className="py-24 lg:py-32 space-y-32">
          <Hero />
          <About />
          <Repos />
          <Languages />
          <Resume />
          <Contact />
        </main>
      </div>
    </div>
  )
}

export default App
