import { Container } from "@/components/Container"
import { Reveal } from "@/components/Reveal"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function EmailCapture() {
  return (
    <section id="newsletter" className="border-b border-line bg-mint/30 py-16">
      <Container className="max-w-[560px] text-center">
        <Reveal>
          <p className="text-lg text-ink">
            Quer receber novidades e conteúdo extra sobre organização financeira? Deixe seu e-mail
          </p>
          <form
            name="newsletter"
            method="POST"
            data-netlify="true"
            netlify-honeypot="empresa"
            className="mt-6 space-y-4 text-left"
          >
            <input type="hidden" name="form-name" value="newsletter" />
            <div className="hidden">
              <label>
                Não preencha este campo
                <input name="empresa" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <div className="space-y-2">
              <Label htmlFor="newsletter-email">E-mail</Label>
              <Input id="newsletter-email" name="email" type="email" required placeholder="seu@email.com" />
            </div>
            <div className="flex items-start gap-3">
              <Checkbox id="newsletter-consent" name="consentimento" required />
              <Label htmlFor="newsletter-consent" className="text-sm font-normal text-muted">
                Concordo em receber comunicações da Planeja Leve Finanças e li a{" "}
                <a href="/politica-de-privacidade/" className="text-green underline underline-offset-2">
                  Política de Privacidade
                </a>
                .
              </Label>
            </div>
            <Button type="submit" className="w-full">
              Quero receber
            </Button>
          </form>
        </Reveal>
      </Container>
    </section>
  )
}
