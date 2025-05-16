/**
 * NUSU Academics - Home Page Scripts
 * Specific functionality for the home page
 */

document.addEventListener("DOMContentLoaded", function() {
  // Load upcoming deadlines for the home page preview
  loadUpcomingDeadlinesPreview();
  
  // Function to load upcoming deadlines
  function loadUpcomingDeadlinesPreview() {
    const deadlinesContainer = document.getElementById('upcomingDeadlines');
    if (!deadlinesContainer) return;
    
    // Fetch deadlines data
    fetch('js/deadlines.json')
      .then(response => response.json())
      .catch(() => {
        // If file doesn't exist yet, use sample data
        return [
          {
            id: 1,
            title: "Essay Submission Deadline",
            description: "Final submission deadline for all English Literature essays",
            date: "2025-02-15T23:59:00",
            type: "assignment",
            course: "English Literature"
          },
          {
            id: 2,
            title: "Midterm Exams Begin",
            description: "Midterm examination period begins for all Science faculty courses",
            date: "2025-02-20T09:00:00",
            type: "exam",
            course: "Multiple Courses"
          },
          {
            id: 3,
            title: "Course Registration Deadline",
            description: "Last day to register for Spring semester courses",
            date: "2025-01-31T16:30:00",
            type: "registration",
            course: "All Courses"
          }
        ];
      })
      .then(data => {
        // Sort deadlines by date (closest first)
        const sortedDeadlines = data.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        // Filter to only show upcoming deadlines (not past)
        const now = new Date();
        const upcomingDeadlines = sortedDeadlines.filter(deadline => new Date(deadline.date) > now);
        
        // Take only the next 3 deadlines
        const nextDeadlines = upcomingDeadlines.slice(0, 3);
        
        if (nextDeadlines.length === 0) {
          deadlinesContainer.innerHTML = '<p>No upcoming deadlines at this time.</p>';
          return;
        }
        
        // Build HTML for deadline items
        let deadlinesHTML = '';
        nextDeadlines.forEach(deadline => {
          const deadlineDate = new Date(deadline.date);
          const month = deadlineDate.toLocaleString('default', { month: 'short' });
          const day = deadlineDate.getDate();
          
          const deadlineTime = deadlineDate.toLocaleTimeString('default', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true
          });
          
          const typeClasses = {
            'assignment': 'badge bg-primary',
            'exam': 'badge bg-danger',
            'registration': 'badge bg-warning text-dark',
            'other': 'badge bg-secondary'
          };
          
          deadlinesHTML += `
            <div class="deadline-item">
              <div class="deadline-date">
                <span class="month">${month}</span>
                <span class="day">${day}</span>
              </div>
              <div class="deadline-content">
                <h3>${deadline.title}</h3>
                <p>${deadline.description}</p>
                <div class="deadline-meta">
                  <span><i data-feather="clock"></i> ${deadlineTime}</span>
                  <span><i data-feather="book-open"></i> ${deadline.course}</span>
                  <span class="${typeClasses[deadline.type] || typeClasses.other}">${deadline.type}</span>
                </div>
              </div>
            </div>
          `;
        });
        
        deadlinesContainer.innerHTML = deadlinesHTML;
        
        // Re-initialize feather icons
        feather.replace({
          'class': 'icon',
          'stroke-width': 2
        });
      });
  }
  
  // Initialize feedback form (for demo purposes)
  const feedbackForm = document.getElementById('feedbackForm');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', function(e) {
      // Only prevent default if it's not a Formspree form
      if (!feedbackForm.action.includes('formspree.io')) {
        e.preventDefault();
        
        // Show a success message
        const successMessage = document.createElement('div');
        successMessage.className = 'alert alert-success mt-3';
        successMessage.textContent = 'Thank you for your feedback! This is a demo, so no data was actually sent.';
        
        feedbackForm.appendChild(successMessage);
        
        // Reset the form
        feedbackForm.reset();
        
        // Remove the success message after 3 seconds
        setTimeout(() => {
          successMessage.remove();
        }, 3000);
      }
    });
  }
});