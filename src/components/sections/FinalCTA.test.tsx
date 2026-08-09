import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { FinalCTA } from "./FinalCTA"

describe("FinalCTA", () => {
  it("repeats a short headline with a centered pending checkout CTA", () => {
    render(<FinalCTA />)
    expect(screen.getByRole("heading", { name: /comece seu kakeibo hoje/i })).toBeInTheDocument()
    const cta = screen.getByRole("link", { name: /quero organizar minhas finanças por r\$ 9,90/i })
    expect(cta).toHaveAttribute("href", "#")
    expect(cta).toHaveAttribute("id", "cta-final")
  })
})
