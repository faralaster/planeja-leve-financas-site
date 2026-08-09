import { ShieldCheck } from "lucide-react"
import { Container } from "@/components/Container"
import { Reveal } from "@/components/Reveal"

export function SocialProof() {
  return (
    <section id="confianca" className="border-b border-line py-16">
      <Container className="flex flex-col items-center gap-4 text-center">
        <Reveal className="flex items-center gap-2 rounded-full border border-line bg-white/60 px-4 py-2 text-sm font-medium text-ink">
          <ShieldCheck className="h-4 w-4 text-green" aria-hidden="true" />
          Pagamento processado com segurança
        </Reveal>
        <Reveal className="max-w-[600px] text-sm leading-relaxed text-muted">
          O Kakeibo é um método japonês centenário, criado por Hani Motoko em 1904 — não foi
          inventado por nós. Organizamos o conteúdo em um formato prático pra você aplicar hoje,
          no seu ritmo.
        </Reveal>
      </Container>
    </section>
  )
}
