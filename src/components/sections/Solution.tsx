import { Container } from "@/components/Container"
import { Reveal } from "@/components/Reveal"
import { NeumorphEyebrow } from "@/components/ui/neumorph-eyebrow"

export function Solution() {
  return (
    <section id="solucao" className="border-b border-line py-20">
      <Container className="grid gap-12 md:grid-cols-2 md:items-center">
        <Reveal>
          <NeumorphEyebrow>O método</NeumorphEyebrow>
          <h2 className="mt-6 font-display text-[clamp(28px,3.6vw,42px)] leading-tight text-ink">
            O que é o Diário Financeiro Kakeibo
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            O Diário Financeiro Kakeibo não é um app, não pede seus dados bancários e não exige
            que você entenda de finanças. É um método japonês com mais de 100 anos que te mostra,
            com clareza, pra onde seu dinheiro está indo — pra você decidir o que fazer com essa
            informação, no seu tempo.
          </p>
        </Reveal>
        <Reveal className="flex justify-center">
          <figure className="w-full max-w-[380px] overflow-hidden rounded-[2rem] border border-line bg-white/60 p-2 shadow-[0_20px_60px_rgb(23_60_53_/_0.14)]">
            <img
              src="/images/capa-diario-financeiro-kakeibo.jpg"
              alt="Capa do Diário Financeiro Kakeibo"
              width={922}
              height={1280}
              loading="lazy"
              decoding="async"
              sizes="(min-width: 768px) 380px, calc(100vw - 48px)"
              className="h-auto w-full rounded-[1.55rem] object-cover"
            />
          </figure>
        </Reveal>
      </Container>
    </section>
  )
}
