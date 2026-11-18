
function Footer() {
  return (
    <footer className="bg-blue-950 px-6 py-10 text-center text-sm text-blue-200">
      <p className="text-lg font-semibold text-white">
        Migrabot
      </p>

      <p className="mt-2">
        Orientación migratoria · Policía de Investigaciones de Chile
      </p>

      <nav className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-3">
        <a href="#inicio" className="transition hover:text-white">
          Inicio
        </a>

        <a href="#que-es-migrabot" className="transition hover:text-white">
          ¿Qué es Migrabot?
        </a>

        <a href="#servicios" className="transition hover:text-white">
          Orientación
        </a>

        <a href="#ayuda" className="transition hover:text-white">
          Ayuda
        </a>
      </nav>

      <p className="mt-6 text-xs text-blue-300">
        Proyecto de orientación informativa.
      </p>
    </footer>
  )
}

export default Footer
