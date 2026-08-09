import { Container } from "@/components/Container"
import { Reveal } from "@/components/Reveal"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const FAQS = [
  {
    question: "Preciso entender de finanças pra usar?",
    answer:
      "Não. O material foi feito justamente pra quem nunca organizou nada antes — sem termos técnicos, sem fórmula.",
  },
  {
    question: "Por que não usar um app de graça?",
    answer:
      "Não é sobre ter o app mais completo — é sobre finalmente começar, sem complicação, sem conectar sua conta bancária a nada, sem mais uma senha pra lembrar. Você escreve, vê pra onde seu dinheiro vai, e ajusta.",
  },
  {
    question: "Funciona no celular ou só impresso?",
    answer:
      "Os dois — você recebe a versão pra imprimir e a versão digital preenchível, pra usar direto no celular ou tablet.",
  },
  {
    question: "Recebo na hora?",
    answer: "Sim, acesso imediato após a confirmação do pagamento.",
  },
  {
    question: "E se eu não gostar?",
    answer:
      "Você tem 7 dias de garantia — se não fizer sentido pra você, devolvemos seu dinheiro, sem perguntas.",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="border-b border-line py-20">
      <Container className="max-w-[760px]">
        <h2 className="text-center font-display text-[clamp(28px,3.6vw,40px)] text-ink">
          Perguntas frequentes
        </h2>
        <Reveal className="mt-10">
          <Accordion type="single" collapsible>
            {FAQS.map((faq, index) => (
              <AccordionItem key={faq.question} value={`item-${index}`}>
                <AccordionTrigger className="font-display text-lg text-ink">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>
    </section>
  )
}
