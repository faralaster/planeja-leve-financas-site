import { Container } from "@/components/Container"
import { ImagePlaceholder } from "@/components/ImagePlaceholder"
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
        <Reveal className="grid grid-cols-3 gap-3">
          <ImagePlaceholder label="Página 1 do Diário" />
          <ImagePlaceholder label="Página 2 do Diário" />
          <ImagePlaceholder label="Página 3 do Diário" />
        </Reveal>
      </Container>
    </section>
  )
}
