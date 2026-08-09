import { Container } from "@/components/Container"
import { Reveal } from "@/components/Reveal"
import { StaggerItem, StaggerList } from "@/components/Stagger"
import { MinimalCard } from "@/components/ui/minimal-card"

const QUESTIONS = [
  "Já perdeu as contas de quanto gastou esse mês?",
  'Sente que o dinheiro "some" antes de você perceber?',
  "Já baixou um app de finanças e desinstalou na primeira semana?",
  "Sente um aperto só de pensar em abrir o extrato do cartão?",
]

export function PainRecognition() {
  return (
    <section id="reconhecimento" className="border-b border-line py-20">
      <Container className="max-w-[720px]">
        <StaggerList className="space-y-4">
          {QUESTIONS.map((question) => (
            <StaggerItem key={question}>
              <MinimalCard className="font-display text-xl text-ink md:text-2xl">{question}</MinimalCard>
            </StaggerItem>
          ))}
        </StaggerList>
        <Reveal className="mt-10">
          <p className="text-lg leading-relaxed text-muted">
            Isso não é falta de força de vontade. É falta da ferramenta certa — uma que não exige
            que você vire especialista em planilha.
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
