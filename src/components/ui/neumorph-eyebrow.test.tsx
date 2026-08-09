import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { NeumorphEyebrow } from "./neumorph-eyebrow"

describe("NeumorphEyebrow", () => {
  it("renders its label text inside a pill badge", () => {
    render(<NeumorphEyebrow>Método Kakeibo</NeumorphEyebrow>)
    expect(screen.getByText("Método Kakeibo")).toBeInTheDocument()
  })
})
