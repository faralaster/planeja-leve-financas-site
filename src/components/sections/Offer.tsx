import { Check } from "lucide-react"
import { Container } from "@/components/Container"
import { StaggerItem, StaggerList } from "@/components/Stagger"
import { Button } from "@/components/ui/button"
import { MinimalCard } from "@/components/ui/minimal-card"

const ITEMS = [
  "Diário Financeiro Kakeibo completo (guia + fichas de planejamento, registro e resumo)",
  "Versão para imprimir E versão digital preenchível",
  "Bônus: Raio-X dos Gastos Invisíveis",
  "Bônus: Desafio de 30 Dias para Economizar (meta em percentual, adaptável a qualquer renda)",
  "Bônus também em 2 formatos (imprimir e digital)",
]

export function Offer() {
  return (
    <section id="oferta" className="border-b border-line py-20">
      <Container className="max-w-[720px] text-center">
        <h2 className="font-display text-[clamp(30px,4vw,46px)] text-ink">Tudo isso por R$ 9,90</h2>
        <StaggerList className="mt-10 space-y-3 text-left">
          {ITEMS.map((item) => (
            <StaggerItem key={item}>
              <MinimalCard className="flex items-start gap-3">
                <Check className="mt-1 h-5 w-5 shrink-0 text-green" aria-hidden="true" />
                <span className="text-muted">{item}</span>
              </MinimalCard>
            </StaggerItem>
          ))}
        </StaggerList>
        <Button asChild size="lg" className="mt-10">
          {/* TODO: link Kirvano */}
          <a href="#" id="cta-oferta">
            Quero meu Diário Kakeibo por R$ 9,90
          </a>
        </Button>
      </Container>
    </section>
  )
}
