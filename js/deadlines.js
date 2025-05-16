/**
 * NUSU Academics - Deadlines Page Scripts
 * Specific functionality for the deadlines page and calendar
 */

document.addEventListener("DOMContentLoaded", function() {
  // Initialize the FullCalendar
  initializeCalendar();
  
  // Load upcoming deadlines list
  loadUpcomingDeadlinesList();
  
  // Initialize deadline filters
  initializeDeadlineFilters();
  
  // Initialize the add deadline form
  initializeAddDeadlineForm();
  
  // Function to initialize the FullCalendar
  function initializeCalendar() {
    const calendarEl = document.getElementById('calendar');
    if (!calendarEl) return;
    
    // Set current date in header
    const currentDateEl = document.getElementById('currentDate');
    if (currentDateEl) {
      const now = new Date();
      currentDateEl.textContent = now.toLocaleDateString('default', { 
        month: 'long', 
        year: 'numeric' 
      });
    }
    
    // Get calendar navigation buttons
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const todayButton = document.getElementById('todayButton');
    const monthViewBtn = document.getElementById('monthView');
    const weekViewBtn = document.getElementById('weekView');
    const listViewBtn = document.getElementById('listView');
    
    // Load calendar events (deadlines)
    loadCalendarEvents().then(events => {
      // Initialize FullCalendar
      const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: false, // We're using our custom header
        events: events,
        eventTimeFormat: {
          hour: '2-digit',
          minute: '2-digit',
          meridiem: 'short'
        },
        eventClick: function(info) {
          // Show event details when clicked
          alert(`
            ${info.event.title}
            ${info.event.extendedProps.description || ''}
            Date: ${info.event.start.toLocaleDateString()}
            Time: ${info.event.start.toLocaleTimeString()}
            Type: ${info.event.extendedProps.type || 'N/A'}
            ${info.event.extendedProps.course ? `Course: ${info.event.extendedProps.course}` : ''}
          `);
        },
        datesSet: function(dateInfo) {
          // Update the header date when the calendar view changes
          if (currentDateEl) {
            const viewTitle = dateInfo.view.title;
            currentDateEl.textContent = viewTitle;
          }
        }
      });
      
      calendar.render();
      
      // Add event listeners to navigation buttons
      if (prevButton) {
        prevButton.addEventListener('click', function() {
          calendar.prev();
        });
      }
      
      if (nextButton) {
        nextButton.addEventListener('click', function() {
          calendar.next();
        });
      }
      
      if (todayButton) {
        todayButton.addEventListener('click', function() {
          calendar.today();
        });
      }
      
      // View buttons
      if (monthViewBtn) {
        monthViewBtn.addEventListener('click', function() {
          calendar.changeView('dayGridMonth');
          // Update active state
          document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
          this.classList.add('active');
        });
      }
      
      if (weekViewBtn) {
        weekViewBtn.addEventListener('click', function() {
          calendar.changeView('timeGridWeek');
          // Update active state
          document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
          this.classList.add('active');
        });
      }
      
      if (listViewBtn) {
        listViewBtn.addEventListener('click', function() {
          calendar.changeView('listMonth');
          // Update active state
          document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
          this.classList.add('active');
        });
      }
    });
  }
  
  // Function to load calendar events
  function loadCalendarEvents() {
    return fetch('js/deadlines.json')
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
        // Convert to FullCalendar event format
        return data.map(item => {
          // Define colors for different deadline types
          const colors = {
            'assignment': '#018BCE', // Primary blue
            'exam': '#dc3545',       // Danger red
            'registration': '#ffc107', // Warning yellow
            'other': '#6c757d'       // Secondary gray
          };
          
          return {
            id: item.id.toString(),
            title: item.title,
            start: item.date,
            color: colors[item.type] || colors.other,
            extendedProps: {
              description: item.description,
              type: item.type,
              course: item.course
            }
          };
        });
      });
  }
  
  // Function to load upcoming deadlines list
  function loadUpcomingDeadlinesList() {
    const deadlinesListEl = document.getElementById('upcomingDeadlinesList');
    if (!deadlinesListEl) return;
    
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
        
        if (upcomingDeadlines.length === 0) {
          deadlinesListEl.innerHTML = '<p>No upcoming deadlines at this time.</p>';
          return;
        }
        
        // Build HTML for deadline items
        let deadlinesHTML = '';
        upcomingDeadlines.forEach(deadline => {
          const deadlineDate = new Date(deadline.date);
          const month = deadlineDate.toLocaleString('default', { month: 'short' });
          const day = deadlineDate.getDate();
          
          const deadlineTime = deadlineDate.toLocaleTimeString('default', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true
          });
          
          deadlinesHTML += `
            <div class="deadline-item" data-type="${deadline.type}">
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
                  <span class="deadline-type">${deadline.type}</span>
                </div>
              </div>
            </div>
          `;
        });
        
        deadlinesListEl.innerHTML = deadlinesHTML;
        
        // Re-initialize feather icons
        feather.replace({
          'class': 'icon',
          'stroke-width': 2
        });
      });
  }
  
  // Function to initialize deadline filters
  function initializeDeadlineFilters() {
    const filterButtons = document.querySelectorAll('.deadline-filters .filter-btn');
    if (!filterButtons.length) return;
    
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get filter value
        const filterValue = this.getAttribute('data-filter');
        
        // Get deadline items
        const deadlineItems = document.querySelectorAll('.deadline-item');
        
        // Apply filter
        deadlineItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-type') === filterValue) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
  
  // Function to initialize add deadline form
  function initializeAddDeadlineForm() {
    const addDeadlineForm = document.getElementById('addDeadlineForm');
    if (!addDeadlineForm) return;
    
    addDeadlineForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const title = document.getElementById('deadlineTitle').value;
      const type = document.getElementById('deadlineType').value;
      const date = document.getElementById('deadlineDate').value;
      const time = document.getElementById('deadlineTime').value;
      const description = document.getElementById('deadlineDescription').value;
      
      // Create datetime string
      const dateTime = `${date}T${time}:00`;
      
      // In a real application, we would save this to the database
      // For demo purposes, we'll just show a success message and reload the calendar
      
      // Show success message
      const successMessage = document.createElement('div');
      successMessage.className = 'alert alert-success mt-3';
      successMessage.textContent = 'Personal deadline added successfully! In a real application, this would be saved to your account.';
      
      addDeadlineForm.appendChild(successMessage);
      
      // Reset the form
      addDeadlineForm.reset();
      
      // Remove the success message after 3 seconds
      setTimeout(() => {
        successMessage.remove();
      }, 3000);
      
      // In a real application, we would reload the calendar with the new deadline
      // For demo purposes, we'll just reload the page after a short delay
      setTimeout(() => {
        //window.location.reload();
      }, 3500);
    });
  }
  
  // Initialize notification subscription form
  const notificationForm = document.getElementById('notificationForm');
  if (notificationForm) {
    notificationForm.addEventListener('submit', function(e) {
      // Only prevent default if it's not a Formspree form
      if (!notificationForm.action.includes('formspree.io')) {
        e.preventDefault();
        
        // Show a success message
        const successMessage = document.createElement('div');
        successMessage.className = 'alert alert-success mt-3';
        successMessage.textContent = 'You have been subscribed to deadline notifications! This is a demo, so no data was actually sent.';
        
        notificationForm.appendChild(successMessage);
        
        // Reset the form
        notificationForm.reset();
        
        // Remove the success message after 3 seconds
        setTimeout(() => {
          successMessage.remove();
        }, 3000);
      }
    });
  }
});