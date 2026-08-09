import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { MinimalCard } from "./minimal-card"

describe("MinimalCard", () => {
  it("renders its children inside a rounded card wrapper", () => {
    render(<MinimalCard>Já perdeu as contas de quanto gastou esse mês?</MinimalCard>)
    expect(screen.getByText(/já perdeu as contas/i)).toBeInTheDocument()
  })
})
