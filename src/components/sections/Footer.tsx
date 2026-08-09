import { Container } from "@/components/Container"

export function Footer() {
  return (
    <footer className="py-10 text-sm text-muted">
      <Container className="flex flex-col items-center gap-3 text-center md:flex-row md:justify-between md:text-left">
        <span>© 2026 Planeja Leve Finanças</span>
        <nav className="flex flex-wrap items-center justify-center gap-4">
          <a href="/politica-de-privacidade/" className="underline underline-offset-2 hover:text-ink">
            Política de Privacidade
          </a>
          <a
            href="https://br.pinterest.com/planejalevefinancas/"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2 hover:text-ink"
          >
            Fale conosco no Pinterest
          </a>
        </nav>
        <span>Conteúdo educativo — não constitui aconselhamento financeiro.</span>
      </Container>
    </footer>
  )
}
