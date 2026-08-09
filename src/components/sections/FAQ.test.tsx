import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { FAQ } from "./FAQ"

describe("FAQ", () => {
  it("renders all five questions and reveals each answer on click", async () => {
    const user = userEvent.setup()
    render(<FAQ />)

    expect(screen.getByRole("button", { name: /preciso entender de finanças pra usar\?/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /por que não usar um app de graça\?/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /funciona no celular ou só impresso\?/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /recebo na hora\?/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /e se eu não gostar\?/i })).toBeInTheDocument()

    const trigger = screen.getByRole("button", { name: /recebo na hora\?/i })
    expect(trigger).toHaveAttribute("aria-expanded", "false")
    await user.click(trigger)
    expect(trigger).toHaveAttribute("aria-expanded", "true")
    expect(screen.getByText(/acesso imediato após a confirmação do pagamento/i)).toBeInTheDocument()
  })
})
