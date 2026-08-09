import { Container } from "@/components/Container"
import { Reveal } from "@/components/Reveal"

export function Agitation() {
  return (
    <section id="agitacao" className="border-b border-line bg-mint/40 py-20">
      <Container className="max-w-[820px]">
        <Reveal>
          <blockquote className="border-l-4 border-gold pl-6 font-display text-[clamp(24px,3.4vw,36px)] leading-snug text-ink">
            Não é sobre ganhar mais. É sobre enxergar com clareza — porque toda meta que você adia
            (a viagem, a reserva de emergência, sair do vermelho) começa exatamente aqui: sabendo
            pra onde o dinheiro está indo.
          </blockquote>
        </Reveal>
      </Container>
    </section>
  )
}
