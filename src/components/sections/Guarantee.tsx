import { BadgeCheck } from "lucide-react"
import { Container } from "@/components/Container"
import { Reveal } from "@/components/Reveal"

export function Guarantee() {
  return (
    <section id="garantia" className="border-b border-line bg-mint/30 py-16">
      <Container className="max-w-[680px] text-center">
        <Reveal className="flex flex-col items-center gap-4">
          <BadgeCheck className="h-10 w-10 text-green" aria-hidden="true" />
          <p className="font-display text-2xl text-ink">
            Garantia de 7 dias — se não fizer sentido pra você, devolvemos seu dinheiro, sem
            perguntas.
          </p>
          <p className="text-sm text-muted">
            Conforme o Código de Defesa do Consumidor (art. 49), você tem até 7 dias corridos após
            a compra para desistir e solicitar reembolso integral, sem necessidade de
            justificativa.
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
