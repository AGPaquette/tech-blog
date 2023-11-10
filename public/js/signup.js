// Define an asynchronous function to handle the signup form submission
const signupFormHandler = async function(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Retrieve the username and password input elements
  const usernameEl = document.querySelector('#username-input-signup');
  const passwordEl = document.querySelector('#password-input-signup');

  // Send a POST request to the '/api/user' endpoint with the signup data
  const response = await fetch('/api/user', {
    method: 'POST',
    body: JSON.stringify({
      username: usernameEl.value,
      password: passwordEl.value,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  // Check if the signup was successful (status code 200)
  if (response.ok) {
    // Redirect to the dashboard after successful signup
    document.location.replace('/dashboard');
  } else {
    // Display an alert if signup fails
    alert('Failed to sign up');
  }
};

// Attach the signupFormHandler function to the signup form's submit event
document
  .querySelector('#signup-form')
  .addEventListener('submit', signupFormHandler);
