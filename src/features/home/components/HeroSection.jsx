import { ArrowRight, ShieldCheck } from "lucide-react";
import Container from "../../../components/ui/Container";
import Button from "../../../components/ui/Button";
import AssistantPreview from "./AssistantPreview";

function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-background py-16 md:py-24"
    >
      {" "}
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Contenido principal */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white px-4 py-2 text-sm font-medium text-primary">
              <ShieldCheck size={17} />
              Orientación migratoria PDI
            </div>

            <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-primary md:text-5xl lg:text-6xl">
              Tu orientación migratoria,
              <span className="text-secondary-dark"> más simple.</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-text-muted md:text-lg">
              Encuentra información sobre trámites y procedimientos migratorios
              relacionados con la Policía de Investigaciones de Chile, de manera
              clara y guiada.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                variant="primary"
                size="lg"
                onClick={() =>
                  document.getElementById("servicios")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
              >
                Comenzar orientación
                <ArrowRight size={18} />
              </Button>
            </div>

            <p className="mt-6 text-sm text-text-muted">
              Información orientativa basada en fuentes oficiales.
            </p>
          </div>

          {/* Vista previa del asistente */}
          <div className="flex justify-center lg:justify-end">
            <AssistantPreview />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HeroSection;
