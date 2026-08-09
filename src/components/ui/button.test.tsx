import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { Button } from "./button"

describe("Button", () => {
  it("renders as the wrapped anchor when asChild is set, instead of a nested button", () => {
    render(
      <Button asChild>
        <a href="#oferta">Quero organizar minhas finanças</a>
      </Button>
    )
    const link = screen.getByRole("link", { name: /quero organizar minhas finanças/i })
    expect(link).toHaveAttribute("href", "#oferta")
    expect(screen.queryByRole("button")).not.toBeInTheDocument()
  })
})
