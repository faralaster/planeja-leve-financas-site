import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { EmailCapture } from "./EmailCapture"

describe("EmailCapture", () => {
  it("renders a required email input and a required LGPD consent checkbox linking to the privacy policy", () => {
    render(<EmailCapture />)
    expect(screen.getByText(/quer receber novidades e conteúdo extra/i)).toBeInTheDocument()

    const emailInput = screen.getByLabelText(/e-mail/i)
    expect(emailInput).toHaveAttribute("type", "email")
    expect(emailInput).toBeRequired()

    const consent = screen.getByRole("checkbox")
    expect(consent).toBeRequired()

    expect(screen.getByRole("link", { name: /política de privacidade/i })).toHaveAttribute(
      "href",
      "/politica-de-privacidade/"
    )

    const form = document.querySelector("form[name='newsletter']")
    expect(form).toHaveAttribute("data-netlify", "true")
  })
})
