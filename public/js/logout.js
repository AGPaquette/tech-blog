// Define an asynchronous function to handle user logout
const logout = async function() {
  // Send a POST request to the '/api/user/logout' endpoint
  const response = await fetch('/api/user/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  // Check if the logout was successful (status code 200)
  if (response.ok) {
    // Redirect to the home page after successful logout
    document.location.replace('/');
  } else {
    // Display an alert if logout fails
    alert('Failed to log out');
  }
};

// Attach the logout function to the click event of the logout link
document.querySelector('#logout-link').addEventListener('click', logout);

  