import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion"

describe("Accordion", () => {
  it("marks the trigger expanded and reveals the answer only after its question is clicked", async () => {
    const user = userEvent.setup()
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Recebo na hora?</AccordionTrigger>
          <AccordionContent>Sim, acesso imediato após a confirmação do pagamento.</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    const trigger = screen.getByRole("button", { name: /recebo na hora\?/i })
    expect(trigger).toHaveAttribute("aria-expanded", "false")
    await user.click(trigger)
    expect(trigger).toHaveAttribute("aria-expanded", "true")
    expect(screen.getByText(/acesso imediato/i)).toBeInTheDocument()
  })
})
