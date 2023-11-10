// Define an asynchronous function to handle the login form submission
const loginFormHandler = async function(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Retrieve the username and password input elements
  const usernameEl = document.querySelector('#username-input-login');
  const passwordEl = document.querySelector('#password-input-login');

  // Send a POST request to the '/api/user/login' endpoint with the login data
  const response = await fetch('/api/user/login', {
    method: 'POST',
    body: JSON.stringify({
      username: usernameEl.value,
      password: passwordEl.value,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  // Check if the login was successful (status code 200)
  if (response.ok) {
    // Redirect to the dashboard after successful login
    document.location.replace('/dashboard');
  } else {
    // Display an alert if login fails
    alert('Failed to login');
  }
};

// Attach the loginFormHandler function to the login form's submit event
document
  .querySelector('#login-form')
  .addEventListener('submit', loginFormHandler);
