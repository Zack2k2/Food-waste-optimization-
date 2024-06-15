from selenium import webdriver
from selenium.webdriver.common.by import By
import time

# Initialize the WebDriver (ensure the correct path to your WebDriver if needed)
browser = webdriver.Chrome()

# Open the webpage where your form is located
browser.get("http://127.0.0.1:3000/login")  # Replace with the actual URL of your login form

# Find the username and password fields and fill them
browser.find_element(By.ID, 'username').send_keys('pencil12')
browser.find_element(By.ID, 'password').send_keys('password')

# Submit the form by clicking the login button
submit_button = browser.find_element(By.XPATH, "//button[@type='submit']")
submit_button.click()
time.sleep(3)

browser.get("http://127.0.0.1:3000/profile")
# Keep the browser open for inspection (optional)
time.sleep(20)  # Wait for 5 seconds before closing the browser

# Close the browser
browser.quit()

