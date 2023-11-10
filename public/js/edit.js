c// Retrieve the postId from the input field
const postId = document.querySelector('input[name="post-id"]').value;

// Define an asynchronous function to handle the edit form submission
const editFormHandler = async function(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Retrieve values from the form elements
  const title = document.querySelector('input[name="post-title"]').value;
  const body = document.querySelector('textarea[name="post-body"]').value;

  // Send a PUT request to update the post with the specified postId
  await fetch(`/api/post/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      body
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // Redirect to the dashboard after editing the post
  document.location.replace('/dashboard');
};

// Define an asynchronous function to handle the delete button click
const deleteClickHandler = async function() {
  // Send a DELETE request to delete the post with the specified postId
  await fetch(`/api/post/${postId}`, {
    method: 'DELETE'
  });

  // Redirect to the dashboard after deleting the post
  document.location.replace('/dashboard');
};

// Attach the editFormHandler function to the edit form's submit event
document
  .querySelector('#edit-post-form')
  .addEventListener('submit', editFormHandler);

// Attach the deleteClickHandler function to the delete button's click event
document
  .querySelector('#delete-btn')
  .addEventListener('click', deleteClickHandler);
