import { motion } from "motion/react"
import { Container } from "@/components/Container"
import { ImagePlaceholder } from "@/components/ImagePlaceholder"
import { Button } from "@/components/ui/button"
import { NeumorphEyebrow } from "@/components/ui/neumorph-eyebrow"

export function Hero() {
  return (
    <section id="hero" className="border-b border-line pb-20 pt-24 md:pb-28 md:pt-32">
      <Container className="grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <NeumorphEyebrow>Método Kakeibo</NeumorphEyebrow>
          <h1 className="mt-7 font-display text-[clamp(38px,6vw,68px)] leading-[1.02] tracking-tight text-ink">
            Kakeibo: o método japonês de 30 dias pra sair do piloto automático financeiro
          </h1>
          <p className="mt-6 max-w-[520px] text-lg leading-relaxed text-muted md:text-xl">
            Sem conectar sua conta bancária a nada. Sem mais um app pra abandonar em uma semana.
          </p>
          <Button asChild size="lg" className="mt-9">
            <a href="#oferta">Quero organizar minhas finanças</a>
          </Button>
        </motion.div>
        <ImagePlaceholder label="Capa do Diário Financeiro Kakeibo" />
      </Container>
    </section>
  )
}
