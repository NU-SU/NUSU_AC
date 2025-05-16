/**
 * NUSU Academics Website Scripts
 * Core functionality shared across all pages
 */

document.addEventListener("DOMContentLoaded", function() {
  // Initialize AOS animation library
  AOS.init({
    duration: 800,
    easing: 'ease',
    once: true,
    offset: 50
  });
  
  // Initialize Feather Icons
  feather.replace({
    'class': 'icon',
    'stroke-width': 2
  });
  
  // Sidebar toggle functionality
  const sidebarCollapse = document.getElementById('sidebarCollapse');
  const sidebar = document.getElementById('sidebar');
  const content = document.getElementById('content');
  
  if (sidebarCollapse) {
    sidebarCollapse.addEventListener('click', function() {
      sidebar.classList.toggle('active');
      
      // Create overlay for mobile
      if (!document.querySelector('.overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.body.appendChild(overlay);
        
        overlay.addEventListener('click', function() {
          sidebar.classList.remove('active');
          overlay.classList.remove('active');
        });
      }
      
      const overlay = document.querySelector('.overlay');
      if (sidebar.classList.contains('active') && window.innerWidth < 992) {
        overlay.classList.add('active');
      } else {
        overlay.classList.remove('active');
      }
    });
  }
  
  // Dark mode functionality
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;
  
  // Check for saved dark mode preference or set based on user's system preference
  const savedDarkMode = localStorage.getItem('darkMode');
  if (savedDarkMode === 'true' || (savedDarkMode === null && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    body.classList.add('dark-mode');
    darkModeToggle.checked = true;
  }
  
  // Dark mode toggle event listener
  darkModeToggle.addEventListener('change', function() {
    if (this.checked) {
      body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'true');
    } else {
      body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'false');
    }
  });
  
  // Global search functionality
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const searchResults = document.getElementById('searchResults');
  
  if (searchInput && searchButton) {
    // Initialize lunr.js search index
    let searchIndex;
    let searchData;
    
    // Fetch search data
    fetch('/js/searchData.json')
      .then(response => response.json())
      .catch(() => {
        // If file doesn't exist yet, use empty data
        return [];
      })
      .then(data => {
        searchData = data || [];
        
        // Create search index
        searchIndex = lunr(function() {
          this.field('title');
          this.field('content');
          this.field('tags');
          this.field('type');
          
          // Add documents to index
          searchData.forEach((doc, index) => {
            doc.id = index;
            this.add(doc);
          });
        });
      });
    
    const performSearch = () => {
      const query = searchInput.value.trim();
      
      if (!query || query.length < 2) {
        if (searchResults) {
          searchResults.innerHTML = '';
          searchResults.classList.remove('active');
        }
        return;
      }
      
      if (!searchIndex) {
        if (searchResults) {
          searchResults.innerHTML = '<p>Search is initializing. Please try again in a moment.</p>';
          searchResults.classList.add('active');
        }
        return;
      }
      
      try {
        const results = searchIndex.search(query);
        
        if (searchResults) {
          if (results.length === 0) {
            searchResults.innerHTML = '<p>No results found. Try different keywords.</p>';
          } else {
            let resultsHTML = `<h3>Search Results</h3><p>${results.length} result(s) found for "${query}"</p>`;
            
            results.forEach(result => {
              const item = searchData[result.ref];
              resultsHTML += `
                <div class="search-result-item">
                  <h4><a href="${item.url}">${item.title}</a></h4>
                  <p>${item.description}</p>
                  <div class="result-meta">
                    <span><i data-feather="tag"></i> ${item.type}</span>
                  </div>
                </div>
              `;
            });
            
            searchResults.innerHTML = resultsHTML;
            feather.replace({
              'class': 'icon',
              'stroke-width': 2
            });
          }
          
          searchResults.classList.add('active');
        }
      } catch (e) {
        console.error('Search error:', e);
        if (searchResults) {
          searchResults.innerHTML = '<p>An error occurred while searching. Please try again.</p>';
          searchResults.classList.add('active');
        }
      }
    };
    
    // Search on button click
    searchButton.addEventListener('click', performSearch);
    
    // Search on Enter key
    searchInput.addEventListener('keyup', function(e) {
      if (e.key === 'Enter') {
        performSearch();
      }
      
      // Hide results when input is cleared
      if (this.value.trim() === '' && searchResults) {
        searchResults.innerHTML = '';
        searchResults.classList.remove('active');
      }
    });
    
    // Close search results when clicking outside
    document.addEventListener('click', function(e) {
      if (searchResults && 
          !searchResults.contains(e.target) && 
          e.target !== searchInput && 
          e.target !== searchButton) {
        searchResults.classList.remove('active');
      }
    });
  }
  
  // Handle form submissions (prevent default behavior for demo)
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      // Only prevent default if it's not a Formspree form
      if (!form.action.includes('formspree.io')) {
        e.preventDefault();
        
        // Show a success message
        const successMessage = document.createElement('div');
        successMessage.className = 'alert alert-success mt-3';
        successMessage.textContent = 'Form submitted successfully! This is a demo, so no data was actually sent.';
        
        form.appendChild(successMessage);
        
        // Reset the form
        form.reset();
        
        // Remove the success message after 3 seconds
        setTimeout(() => {
          successMessage.remove();
        }, 3000);
      }
    });
  });
});