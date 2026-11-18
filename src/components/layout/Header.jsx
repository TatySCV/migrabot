
function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <a href="/" className="flex items-center gap-3">
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

        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          <a href="#inicio" className="transition hover:text-blue-700">
            Inicio
          </a>
          <a href="#servicio" className="transition hover:text-blue-700">
            ¿Qué es Migrabot?
          </a>
          <a href="#ayuda" className="transition hover:text-blue-700">
            Ayuda
          </a>
        </nav>

        <a
          href="/admin"
          className="rounded-lg border border-blue-900 px-4 py-2 text-sm font-semibold text-blue-900 transition hover:bg-blue-50"
        >
          Acceso funcionarios
        </a>

      </div>
    </header>
  )
}

export default Header
