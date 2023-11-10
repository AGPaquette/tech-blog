// Define an asynchronous function to handle the new post form submission
const newFormHandler = async function(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Retrieve values from the form elements
  const title = document.querySelector('input[name="post-title"]').value;
  const body = document.querySelector('textarea[name="post-body"]').value;

  // Send a POST request to the '/api/post' endpoint with the new post data
  await fetch(`/api/post`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      body,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  // Redirect to the dashboard after creating a new post
  document.location.replace('/dashboard');
};

// Attach the newFormHandler function to the new post form's submit event
document
  .querySelector('#new-post-form')
  .addEventListener('submit', newFormHandler);
