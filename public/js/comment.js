// Define an asynchronous function to handle comment form submission
const commentFormHandler = async function(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Retrieve values from the form elements
  const postId = document.querySelector('input[name="post-id"]').value;
  const body = document.querySelector('textarea[name="comment-body"]').value;

  // Check if the 'body' field is not empty
  if (body) {
    // Send a POST request to the '/api/comment' endpoint with the comment data
    await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({
        postId,
        body
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Reload the page after submitting the comment
    document.location.reload();
  }
};

// Attach the commentFormHandler function to the form's submit event
document
  .querySelector('#new-comment-form')
  .addEventListener('submit', commentFormHandler);

