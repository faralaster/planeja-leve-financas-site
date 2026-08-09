import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { Footer } from "./Footer"

describe("Footer", () => {
  it("shows the brand, a link to the privacy policy, and the educational-content disclaimer", () => {
    render(<Footer />)
    expect(screen.getByText(/© 2026 planeja leve finanças/i)).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /política de privacidade/i })).toHaveAttribute(
      "href",
      "/politica-de-privacidade/"
    )
    expect(screen.getByText(/não constitui aconselhamento financeiro/i)).toBeInTheDocument()
  })
})
