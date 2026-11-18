
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="relative z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <a href="#inicio" onClick={closeMenu} className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-900 text-xl font-bold text-white">
            M
          </div>

          <div>
            <h1 className="text-xl font-bold text-blue-950">
              Migrabot
            </h1>
            <p className="text-xs text-slate-500">
              Orientación migratoria
            </p>
          </div>
        </a>

        {/* Navegación escritorio */}
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          <a href="#inicio" className="transition hover:text-blue-700">
            Inicio
          </a>
          <a href="#que-es-migrabot" className="transition hover:text-blue-700">
            ¿Qué es Migrabot?
          </a>
          <a href="#ayuda" className="transition hover:text-blue-700">
            Ayuda
          </a>
        </nav>

        {/* Acceso funcionarios escritorio */}
        <a
          href="/admin"
          className="hidden rounded-lg border border-blue-900 px-4 py-2 text-sm font-semibold text-blue-900 transition hover:bg-blue-50 md:block"
        >
          Acceso funcionarios
        </a>

        {/* Botón menú móvil */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          className="rounded-lg p-2 text-blue-950 transition hover:bg-slate-100 md:hidden"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Menú desplegable móvil */}
      {menuOpen && (
        <nav className="absolute left-0 top-full w-full border-t border-slate-200 bg-white px-6 py-5 shadow-lg md:hidden">
          <div className="flex flex-col gap-5 text-sm font-medium text-blue-950">
            <a href="#inicio" onClick={closeMenu}>
              Inicio
            </a>
            <a href="#que-es-migrabot" onClick={closeMenu}>
              ¿Qué es Migrabot?
            </a>
            <a href="#ayuda" onClick={closeMenu}>
              Ayuda
            </a>

            <a
              href="/admin"
              onClick={closeMenu}
              className="rounded-lg border border-blue-900 px-4 py-3 text-center font-semibold text-blue-900"
            >
              Acceso funcionarios
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}

export default Header
