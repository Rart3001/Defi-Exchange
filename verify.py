from playwright.sync_api import sync_playwright

def verify_frontend():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:3000")

        # Take a screenshot of the initial state
        page.screenshot(path="verification_initial.png")

        # The input fields are hidden behind the "Connect your wallet" button
        # because walletConnected is false by default.
        # We can simulate the state by executing script on the page
        page.evaluate("() => { window.dispatchEvent(new Event('load')); }")

        # Take another screenshot
        page.screenshot(path="verification_after_load.png")

        browser.close()

if __name__ == "__main__":
    verify_frontend()
