import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { Offer } from "./Offer"

describe("Offer", () => {
  it("lists all five included items and shows a pending checkout CTA", () => {
    render(<Offer />)
    expect(screen.getByRole("heading", { name: /tudo isso por r\$ 9,90/i })).toBeInTheDocument()
    expect(screen.getByText(/diário financeiro kakeibo completo/i)).toBeInTheDocument()
    expect(screen.getByText(/versão para imprimir e versão digital preenchível/i)).toBeInTheDocument()
    expect(screen.getByText(/raio-x dos gastos invisíveis/i)).toBeInTheDocument()
    expect(screen.getByText(/desafio de 30 dias para economizar/i)).toBeInTheDocument()
    expect(screen.getByText(/bônus também em 2 formatos/i)).toBeInTheDocument()
    const cta = screen.getByRole("link", { name: /quero meu diário kakeibo/i })
    expect(cta).toHaveAttribute("href", "#")
    expect(cta).toHaveAttribute("id", "cta-oferta")
  })
})
