import { ArrowRight } from 'lucide-react'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'

function ServiceCard({
  icon: Icon,
  title,
  description,
  onClick,
}) {
  return (
    <Card
      variant="outlined"
      padding="lg"
      className="group h-full transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
        {Icon && <Icon size={24} />}
      </div>

      <h3 className="mt-5 text-lg font-semibold text-primary">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-text-muted">
        {description}
      </p>

      <div className="mt-5">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClick}
        >
          Ver orientación
          <ArrowRight size={16} />
        </Button>
      </div>
    </Card>
  )
}

export default ServiceCard