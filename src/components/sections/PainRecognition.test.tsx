import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { PainRecognition } from "./PainRecognition"

describe("PainRecognition", () => {
  it("renders all four pain-recognition questions and the closing reassurance line", () => {
    render(<PainRecognition />)
    expect(screen.getByText(/já perdeu as contas de quanto gastou esse mês\?/i)).toBeInTheDocument()
    expect(screen.getByText(/o dinheiro "some" antes de você perceber\?/i)).toBeInTheDocument()
    expect(screen.getByText(/desinstalou na primeira semana\?/i)).toBeInTheDocument()
    expect(screen.getByText(/abrir o extrato do cartão\?/i)).toBeInTheDocument()
    expect(screen.getByText(/não é falta de força de vontade/i)).toBeInTheDocument()
  })
})
