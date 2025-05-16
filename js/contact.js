/**
 * NUSU Academics - Contact Page Scripts
 * Specific functionality for the contact page
 */

document.addEventListener("DOMContentLoaded", function() {
  // Initialize contact form validation and submission
  initializeContactForm();
  
  // Function to initialize contact form
  function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
      // Only prevent default if it's not a Formspree form
      if (!contactForm.action.includes('formspree.io')) {
        e.preventDefault();
        
        // Validate form (in a real application, more validation would be done)
        let isValid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        
        if (name && name.value.trim() === '') {
          isValid = false;
          markInvalid(name, 'Please enter your name.');
        } else if (name) {
          markValid(name);
        }
        
        if (email && email.value.trim() === '') {
          isValid = false;
          markInvalid(email, 'Please enter your email address.');
        } else if (email && !isValidEmail(email.value)) {
          isValid = false;
          markInvalid(email, 'Please enter a valid email address.');
        } else if (email) {
          markValid(email);
        }
        
        if (message && message.value.trim() === '') {
          isValid = false;
          markInvalid(message, 'Please enter your message.');
        } else if (message) {
          markValid(message);
        }
        
        // If form is valid, show success message
        if (isValid) {
          // Show a success message
          const successMessage = document.createElement('div');
          successMessage.className = 'alert alert-success mt-3';
          successMessage.textContent = 'Your message has been sent successfully! This is a demo, so no data was actually sent.';
          
          contactForm.appendChild(successMessage);
          
          // Reset the form
          contactForm.reset();
          
          // Remove validation styling
          const formControls = contactForm.querySelectorAll('.form-control');
          formControls.forEach(control => {
            control.classList.remove('is-valid');
          });
          
          // Remove the success message after 3 seconds
          setTimeout(() => {
            successMessage.remove();
          }, 3000);
        }
      }
    });
    
    // Helper function to mark a field as invalid
    function markInvalid(element, message) {
      element.classList.add('is-invalid');
      element.classList.remove('is-valid');
      
      // Add or update feedback message
      let feedback = element.nextElementSibling;
      if (!feedback || !feedback.classList.contains('invalid-feedback')) {
        feedback = document.createElement('div');
        feedback.className = 'invalid-feedback';
        element.parentNode.insertBefore(feedback, element.nextSibling);
      }
      
      feedback.textContent = message;
    }
    
    // Helper function to mark a field as valid
    function markValid(element) {
      element.classList.remove('is-invalid');
      element.classList.add('is-valid');
      
      // Remove any feedback message
      const feedback = element.nextElementSibling;
      if (feedback && feedback.classList.contains('invalid-feedback')) {
        feedback.remove();
      }
    }
    
    // Helper function to validate email
    function isValidEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
    
    // Add live validation on input fields
    const formInputs = contactForm.querySelectorAll('.form-control');
    formInputs.forEach(input => {
      input.addEventListener('blur', function() {
        if (this.id === 'name' && this.value.trim() === '') {
          markInvalid(this, 'Please enter your name.');
        } else if (this.id === 'email' && this.value.trim() === '') {
          markInvalid(this, 'Please enter your email address.');
        } else if (this.id === 'email' && !isValidEmail(this.value)) {
          markInvalid(this, 'Please enter a valid email address.');
        } else if (this.id === 'message' && this.value.trim() === '') {
          markInvalid(this, 'Please enter your message.');
        } else {
          markValid(this);
        }
      });
    });
  }
});