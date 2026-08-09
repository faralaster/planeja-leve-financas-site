import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { Guarantee } from "./Guarantee"

describe("Guarantee", () => {
  it("states the 7-day no-questions-asked guarantee and cites CDC art. 49", () => {
    render(<Guarantee />)
    expect(screen.getByText(/garantia de 7 dias/i)).toBeInTheDocument()
    expect(screen.getByText(/sem perguntas/i)).toBeInTheDocument()
    expect(screen.getByText(/código de defesa do consumidor \(art\. 49\)/i)).toBeInTheDocument()
  })
})
