from playwright.sync_api import sync_playwright
import time

def verify_frontend():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:3000")

        # Wait for the Next.js app to rebuild and reload
        time.sleep(5)
        page.reload()

        # Fill the addEther input
        # Note: we need to find the correct input. Let's look at the structure.
        # It's an input with placeholder "Amount of Ether"
        add_ether_input = page.get_by_placeholder("Amount of Ether")
        if add_ether_input.count() > 0:
            add_ether_input.fill("10")
            print("Filled addEther input")
            page.screenshot(path="verification_add_ether.png")
            time.sleep(1) # Wait for debounce

        # Switch to Swap tab
        swap_tab = page.get_by_role("button", name="Swap")
        if swap_tab.count() > 0:
            swap_tab.click()
            print("Clicked Swap tab")
            time.sleep(1)

            # Fill swapAmount input
            swap_amount_input = page.get_by_placeholder("Amount")
            if swap_amount_input.count() > 0:
                swap_amount_input.fill("5")
                print("Filled swapAmount input")
                page.screenshot(path="verification_swap_amount.png")
                time.sleep(1) # Wait for debounce

        browser.close()

if __name__ == "__main__":
    verify_frontend()
