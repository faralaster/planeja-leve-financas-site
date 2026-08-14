import { motion } from "motion/react"
import { Container } from "@/components/Container"
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
        <motion.figure
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-[2rem] border border-line bg-white/60 p-2 shadow-[0_24px_70px_rgb(23_60_53_/_0.16)]"
        >
          <img
            src="/images/diario-kakeibo-celular.jpg"
            alt="Diário Financeiro Kakeibo acompanhado de um registro financeiro no celular"
            width={1280}
            height={856}
            loading="eager"
            decoding="async"
            sizes="(min-width: 768px) 42vw, calc(100vw - 48px)"
            className="h-auto w-full rounded-[1.55rem] object-cover"
          />
        </motion.figure>
      </Container>
    </section>
  )
}
