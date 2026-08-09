import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { PrivacyPage } from "./PrivacyPage"

describe("PrivacyPage", () => {
  it("covers the Kakeibo sales page's three personal-data touchpoints: email opt-in, Kirvano payment, and the Pinterest integration", () => {
    render(<PrivacyPage />)
    expect(screen.getByRole("heading", { level: 1, name: /política de privacidade/i })).toBeInTheDocument()
    expect(screen.getAllByText(/kirvano/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/consentimento/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/api do pinterest/i).length).toBeGreaterThan(0)
    expect(screen.getByRole("link", { name: /voltar ao início/i })).toHaveAttribute("href", "/")
  })
})
