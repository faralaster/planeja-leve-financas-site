import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { Hero } from "./Hero"

describe("Hero", () => {
  it("renders the headline, subheadline and a CTA linking to the offer section", () => {
    render(<Hero />)
    expect(
      screen.getByRole("heading", { level: 1, name: /kakeibo: o método japonês de 30 dias/i })
    ).toBeInTheDocument()
    expect(screen.getByText(/sem conectar sua conta bancária a nada/i)).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /quero organizar minhas finanças/i })).toHaveAttribute(
      "href",
      "#oferta"
    )
    expect(
      screen.getByRole("img", { name: /diário financeiro kakeibo acompanhado/i })
    ).toHaveAttribute("src", "/images/diario-kakeibo-celular.jpg")
  })
})
