import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Checkbox } from "./checkbox"

describe("Checkbox", () => {
  it("toggles checked state and syncs a hidden native input with the given name for static form submission", async () => {
    const user = userEvent.setup()
    render(<Checkbox id="consent" name="consentimento" required />)
    const box = screen.getByRole("checkbox")
    expect(box).not.toBeChecked()
    await user.click(box)
    expect(box).toBeChecked()
  })
})
