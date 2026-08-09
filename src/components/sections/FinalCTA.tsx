import { Container } from "@/components/Container"
import { Reveal } from "@/components/Reveal"
import { Button } from "@/components/ui/button"

export function FinalCTA() {
  return (
    <section id="cta-final-section" className="border-b border-line py-20 text-center">
      <Container className="max-w-[640px]">
        <Reveal>
          <h2 className="font-display text-[clamp(30px,4vw,46px)] text-ink">Comece seu Kakeibo hoje</h2>
          <Button asChild size="lg" className="mt-8">
            {/* TODO: link Kirvano */}
            <a href="#" id="cta-final">
              Quero organizar minhas finanças por R$ 9,90
            </a>
          </Button>
        </Reveal>
      </Container>
    </section>
  )
}
