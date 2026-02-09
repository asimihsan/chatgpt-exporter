import { describe, expect, it } from 'vitest'
import { TOUCH_CLICK_DEDUP_WINDOW_MS, shouldSuppressClickAfterTouch } from './menuItemInteraction'

describe('menu item interaction', () => {
    it('does not suppress click when there was no prior touch', () => {
        expect(shouldSuppressClickAfterTouch(null, 1000)).toBe(false)
    })

    it('suppresses click when it follows a touch within the dedupe window', () => {
        const now = 2000
        const lastTouch = now - (TOUCH_CLICK_DEDUP_WINDOW_MS - 1)
        expect(shouldSuppressClickAfterTouch(lastTouch, now)).toBe(true)
    })

    it('does not suppress click outside the dedupe window', () => {
        const now = 3000
        const lastTouch = now - (TOUCH_CLICK_DEDUP_WINDOW_MS + 1)
        expect(shouldSuppressClickAfterTouch(lastTouch, now)).toBe(false)
    })

    it('does not suppress click when clock skew yields negative elapsed time', () => {
        expect(shouldSuppressClickAfterTouch(5000, 4000)).toBe(false)
    })
})

