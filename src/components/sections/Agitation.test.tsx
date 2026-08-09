import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { Agitation } from "./Agitation"

describe("Agitation", () => {
  it("renders the clarity-over-income framing as a blockquote", () => {
    render(<Agitation />)
    expect(screen.getByText(/não é sobre ganhar mais/i)).toBeInTheDocument()
    expect(screen.getByText(/sabendo pra onde o dinheiro está indo/i)).toBeInTheDocument()
  })
})
