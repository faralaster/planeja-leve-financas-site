import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { ImagePlaceholder } from "./ImagePlaceholder"

describe("ImagePlaceholder", () => {
  it("exposes the label as the accessible name of the image placeholder", () => {
    render(<ImagePlaceholder label="Capa do Diário Financeiro Kakeibo" />)
    expect(
      screen.getByRole("img", { name: "Capa do Diário Financeiro Kakeibo" })
    ).toBeInTheDocument()
  })
})
