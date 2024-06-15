import matplotlib.pyplot as plt

# Data for the bar graph
test_types = ['Unit Test', 'Integration Test', 'System Test', 'Acceptance Test']
values = [14, 60, 90, 125]

# Create the bar graph
plt.figure(figsize=(10, 6))
plt.bar(test_types, values, color=['blue', 'orange', 'green', 'red'])

# Add grid lines
plt.grid(True, which='both', linestyle='--', linewidth=0.5)

# Add labels and title
plt.xlabel('Test Type')
plt.ylabel('Values')
plt.title('Test Type Values')

# Show the plot
plt.show()

