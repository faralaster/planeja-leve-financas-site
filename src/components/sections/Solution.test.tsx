import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { Solution } from "./Solution"

describe("Solution", () => {
  it("explains what the Kakeibo diary is and shows its cover", () => {
    render(<Solution />)
    expect(screen.getByRole("heading", { name: /o que é o diário financeiro kakeibo/i })).toBeInTheDocument()
    expect(screen.getByText(/não é um app, não pede seus dados bancários/i)).toBeInTheDocument()
    expect(screen.getByRole("img", { name: /capa do diário financeiro kakeibo/i })).toHaveAttribute(
      "src",
      "/images/capa-diario-financeiro-kakeibo.jpg"
    )
  })
})
