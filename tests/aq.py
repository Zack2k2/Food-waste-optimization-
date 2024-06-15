rom selenium import webdriver
from selenium.webdriver.common.by import By
import time

# Initialize the WebDriver (ensure the correct path to your WebDriver if needed)
browser = webdriver.Chrome()

# Open the webpage where your form is located
browser.get("http://127.0.0.1/foods/addDish")  # Replace with the actual URL of your add dish form

# Fill in the Dish Name
browser.find_element(By.ID, 'dist_name').send_keys('Pizza Fajita')

# Fill in the Ingredients
browser.find_element(By.ID, 'ingredients').send_keys('flour, water, yeast, tomato sauce, mozzarella cheese, chicken, bell peppers, onions, olives')

# Fill in the Difficulty Cooking (assuming it is 4)
browser.find_element(By.ID, 'difficulty_cooking').send_keys('4')

# Fill in the Quality (assuming it is 5)
browser.find_element(By.ID, 'quality').send_keys('5')

# Fill in the Expiration Date (assuming today's date is June 13, 2024)
browser.find_element(By.ID, 'expiration_date').send_keys('2024-06-13')

# Fill in the Quantity (assuming it is 10)
browser.find_element(By.ID, 'quantity').send_keys('10')

# Select the Storage Location (assuming it is 'Refrigerator')
storage_location = browser.find_element(By.ID, 'storage_location')
for option in storage_location.find_elements(By.TAG_NAME, 'option'):
    if option.text == 'Refrigerator':
        option.click()
        break

# Submit the form
browser.find_element(By.XPATH, "//button[@type='submit']").click()

# Keep the browser open for inspection (optional)
time.sleep(5)  # Wait for 5 seconds before closing the browser

# Close the browser
browser.quit()


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

# Keep the browser open for inspection (optional)
time.sleep(20)  # Wait for 5 seconds before closing the browser

# Close the browser
browser.quit()

from selenium import webdriver
from selenium.webdriver.common.by import By
import time

# Initialize the WebDriver (ensure the correct path to your WebDriver if needed)
browser = webdriver.Chrome()

# Open the webpage where your form is located
browser.get("http://127.0.0.1:3000/foods/getsuggestion")


# Replace with the actual URL of your add dish form
input()
