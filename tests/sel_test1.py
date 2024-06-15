from selenium import webdriver
from selenium.webdriver.common.by import By



browser = webdriver.Chrome()


browser.get("http://127.0.0.1:3000/register")

name = browser.find_element(By.ID,'name')
name.send_keys("pencil")

browser.find_element(By.ID,'username').send_keys("pencil12")
browser.find_element(By.ID,'age').send_keys("24")
browser.find_element(By.ID,'weight').send_keys("84")

browser.find_element(By.ID,'password').send_keys("password")
checkbox_values = ["soy", "milk"]
for value in checkbox_values:
    checkbox = browser.find_element(By.XPATH, f"//input[@type='checkbox' and @value='{value}']")
    if not checkbox.is_selected():
        checkbox.click()

submit_button = browser.find_element(By.XPATH, "//button[@type='submit']")
submit_button.click()

browser.get("http://127.0.0.1:3000/profile")


input("press for next:")

browser.get("http://127.0.0.1:3000/foods/dish/1")

# Find the text area and enter a comment
comment_box = browser.find_element(By.NAME, 'comment')
comment_box.send_keys("This is a test comment.")

# Find and click the submit button
submit_button = browser.find_element(By.XPATH, "//button[@type='submit']")
submit_button.click()

# Keep the browser open for inspection
input("Press Enter to close the browser...")

# Find and fill out the form fields
dish_name = "Pizza Fajita"
ingredients = "Pizza Dough, Tomato Sauce, Mozzarella Cheese, Chicken, Bell Peppers, Onions, Fajita Seasoning"
difficulty = 3  # Assuming medium difficulty
quality = 4  # Assuming good quality
expiration_date = "2024-07-01"  # Assuming expiration date
quantity = 5  # Assuming quantity
storage_location = "Freezer"  # Assuming storage location

# Fill in the dish name
dish_name_field = browser.find_element(By.ID, 'dist_name')
dish_name_field.send_keys(dish_name)

# Fill in the ingredients (comma separated)
ingredients_field = browser.find_element(By.ID, 'ingredients')
ingredients_field.send_keys(ingredients)

# Fill in the difficulty of cooking
difficulty_field = browser.find_element(By.ID, 'difficulty_cooking')
difficulty_field.send_keys(str(difficulty))

# Fill in the quality rating
quality_field = browser.find_element(By.ID, 'quality')
quality_field.send_keys(str(quality))

# Fill in the expiration date
expiration_date_field = browser.find_element(By.ID, 'expiration_date')
expiration_date_field.send_keys(expiration_date)

# Fill in the quantity
quantity_field = browser.find_element(By.ID, 'quantity')
quantity_field.send_keys(str(quantity))

# Select the storage location from the dropdown
storage_location_dropdown = Select(browser.find_element(By.ID, 'storage_location'))
storage_location_dropdown.select_by_visible_text(storage_location)

# Submit the form by clicking the button
submit_button = browser.find_element(By.XPATH, "//button[@type='submit']")
submit_button.click()

# Keep the browser open for inspection (optional)
time.sleep(5)  # Wait for 5 seconds before closing the browser

# Close the browser
browser.quit()

