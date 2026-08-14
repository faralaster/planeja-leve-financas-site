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
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <figure className="overflow-hidden rounded-[1.75rem] border border-line bg-white/60 p-2 text-left shadow-[0_18px_50px_rgb(23_60_53_/_0.12)]">
            <img
              src="/images/bonus-raio-x-gastos-invisiveis.jpg"
              alt="Capa do bônus Raio-X dos Gastos Invisíveis"
              width={904}
              height={1280}
              loading="lazy"
              decoding="async"
              sizes="(min-width: 640px) 338px, calc(100vw - 48px)"
              className="h-auto w-full rounded-[1.3rem] object-cover"
            />
            <figcaption className="px-3 pb-2 pt-4">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Bônus 1</span>
              <p className="mt-1 font-display text-xl text-ink">Raio-X dos Gastos Invisíveis</p>
            </figcaption>
          </figure>
          <figure className="overflow-hidden rounded-[1.75rem] border border-line bg-white/60 p-2 text-left shadow-[0_18px_50px_rgb(23_60_53_/_0.12)]">
            <img
              src="/images/bonus-desafio-30-dias-economizar.jpg"
              alt="Capa do bônus Desafio de 30 Dias para Economizar"
              width={904}
              height={1280}
              loading="lazy"
              decoding="async"
              sizes="(min-width: 640px) 338px, calc(100vw - 48px)"
              className="h-auto w-full rounded-[1.3rem] object-cover"
            />
            <figcaption className="px-3 pb-2 pt-4">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Bônus 2</span>
              <p className="mt-1 font-display text-xl text-ink">Desafio de 30 Dias para Economizar</p>
            </figcaption>
          </figure>
        </div>
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
