import { describe, expect, it } from "vitest"
import { render } from "@testing-library/react"
import { App } from "./App"

describe("App", () => {
  it("renders every landing page section in the required order", () => {
    const { container } = render(<App />)
    const sectionIds = Array.from(container.querySelectorAll("section")).map((section) => section.id)
    expect(sectionIds).toEqual([
      "hero",
      "reconhecimento",
      "agitacao",
      "solucao",
      "oferta",
      "newsletter",
      "confianca",
      "garantia",
      "faq",
      "cta-final-section",
    ])
    expect(container.querySelector("footer")).not.toBeNull()
  })
})
