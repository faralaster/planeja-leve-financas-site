import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { SocialProof } from "./SocialProof"

describe("SocialProof", () => {
  it("shows the secure payment badge and the method transparency note", () => {
    render(<SocialProof />)
    expect(screen.getByText(/pagamento processado com segurança/i)).toBeInTheDocument()
    expect(screen.getByText(/método japonês centenário/i)).toBeInTheDocument()
    expect(screen.getByText(/hani motoko em 1904/i)).toBeInTheDocument()
  })
})
