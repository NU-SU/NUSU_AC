/**
 * NUSU Academics - Resources Page Scripts
 * Specific functionality for the resources page
 */

document.addEventListener("DOMContentLoaded", function() {
  // Resource filtering functionality
  initializeResourceFilters();
  
  // Initialize search for resources
  initializeResourceSearch();
  
  // Function to initialize resource filters
  function initializeResourceFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const resourceItems = document.querySelectorAll('.resource-item');
    
    if (filterButtons.length > 0 && resourceItems.length > 0) {
      // Add click event to filter buttons
      filterButtons.forEach(button => {
        button.addEventListener('click', function() {
          // Remove active class from all buttons
          filterButtons.forEach(btn => btn.classList.remove('active'));
          
          // Add active class to clicked button
          this.classList.add('active');
          
          // Get filter value
          const filterValue = this.getAttribute('data-filter');
          
          // Filter resources
          resourceItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-type') === filterValue) {
              item.style.display = 'block';
            } else {
              item.style.display = 'none';
            }
          });
        });
      });
    }
  }
  
  // Function to initialize resource search
  function initializeResourceSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const resourceSections = document.querySelectorAll('.resource-section');
    const resourceItems = document.querySelectorAll('.resource-item');
    const searchResults = document.getElementById('searchResults');
    
    if (searchInput && searchButton && resourceItems.length > 0) {
      // Build resource data for search
      const resourceData = [];
      
      resourceItems.forEach(item => {
        const title = item.querySelector('h3')?.textContent || '';
        const description = item.querySelector('p')?.textContent || '';
        const type = item.getAttribute('data-type') || '';
        
        resourceData.push({
          element: item,
          title: title,
          description: description,
          type: type,
          searchContent: `${title} ${description} ${type}`.toLowerCase()
        });
      });
      
      // Perform search
      const performSearch = () => {
        const query = searchInput.value.trim().toLowerCase();
        
        if (!query || query.length < 2) {
          // Hide search results, show all sections
          if (searchResults) {
            searchResults.innerHTML = '';
            searchResults.classList.remove('active');
          }
          
          resourceSections.forEach(section => {
            section.style.display = 'block';
          });
          
          resourceItems.forEach(item => {
            item.style.display = 'block';
          });
          
          return;
        }
        
        // Find matching resources
        const matches = resourceData.filter(resource => 
          resource.searchContent.includes(query)
        );
        
        // Show search results
        if (searchResults) {
          if (matches.length === 0) {
            searchResults.innerHTML = `
              <h3>Search Results</h3>
              <p>No resources found matching "${query}". Try different keywords or browse our categories below.</p>
            `;
          } else {
            let resultsHTML = `
              <h3>Search Results</h3>
              <p>${matches.length} resource(s) found matching "${query}"</p>
              <div class="row resources-grid">
            `;
            
            matches.forEach(match => {
              // Clone the matched element for display in search results
              const clonedItem = match.element.cloneNode(true);
              resultsHTML += `<div class="col-md-4 col-sm-6">${clonedItem.outerHTML}</div>`;
            });
            
            resultsHTML += `</div>`;
            searchResults.innerHTML = resultsHTML;
          }
          
          searchResults.classList.add('active');
          
          // Hide all resource sections when showing search results
          resourceSections.forEach(section => {
            section.style.display = 'none';
          });
          
          // Re-initialize feather icons
          feather.replace({
            'class': 'icon',
            'stroke-width': 2
          });
        }
      };
      
      // Search on button click
      searchButton.addEventListener('click', performSearch);
      
      // Search on Enter key
      searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
          performSearch();
        }
        
        // If search is cleared, show all sections again
        if (this.value.trim() === '') {
          if (searchResults) {
            searchResults.innerHTML = '';
            searchResults.classList.remove('active');
          }
          
          resourceSections.forEach(section => {
            section.style.display = 'block';
          });
          
          resourceItems.forEach(item => {
            item.style.display = 'block';
          });
        }
      });
    }
  }
  
  // Initialize resource suggestion form
  const suggestResourceForm = document.getElementById('suggestResourceForm');
  if (suggestResourceForm) {
    suggestResourceForm.addEventListener('submit', function(e) {
      // Only prevent default if it's not a Formspree form
      if (!suggestResourceForm.action.includes('formspree.io')) {
        e.preventDefault();
        
        // Show a success message
        const successMessage = document.createElement('div');
        successMessage.className = 'alert alert-success mt-3';
        successMessage.textContent = 'Thank you for suggesting a resource! This is a demo, so no data was actually sent.';
        
        suggestResourceForm.appendChild(successMessage);
        
        // Reset the form
        suggestResourceForm.reset();
        
        // Remove the success message after 3 seconds
        setTimeout(() => {
          successMessage.remove();
        }, 3000);
      }
    });
  }
});