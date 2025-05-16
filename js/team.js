/**
 * NUSU Academics - Team Page Scripts
 * Specific functionality for the team page
 */

document.addEventListener("DOMContentLoaded", function() {
  // Initialize team search functionality
  initializeTeamSearch();
  
  // Function to initialize team search
  function initializeTeamSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const teamCards = document.querySelectorAll('.team-card');
    const teamSections = document.querySelectorAll('.team-section');
    
    if (searchInput && searchButton && teamCards.length > 0) {
      // Build team data for search
      const teamData = [];
      
      teamCards.forEach(card => {
        const name = card.querySelector('h3')?.textContent || '';
        const role = card.querySelector('.team-role')?.textContent || '';
        const bio = card.querySelector('.team-bio')?.textContent || '';
        
        teamData.push({
          element: card,
          name: name,
          role: role,
          bio: bio,
          searchContent: `${name} ${role} ${bio}`.toLowerCase()
        });
      });
      
      // Perform search
      const performSearch = () => {
        const query = searchInput.value.trim().toLowerCase();
        
        if (!query || query.length < 2) {
          // Show all teams and sections
          teamCards.forEach(card => {
            card.closest('.col-lg-3, .col-lg-4, .col-md-4, .col-md-6').style.display = 'block';
          });
          
          teamSections.forEach(section => {
            section.style.display = 'block';
          });
          
          return;
        }
        
        // Find matching team members
        const matches = teamData.filter(member => 
          member.searchContent.includes(query)
        );
        
        // Hide all team cards first
        teamCards.forEach(card => {
          card.closest('.col-lg-3, .col-lg-4, .col-md-4, .col-md-6').style.display = 'none';
        });
        
        // Show matching team cards
        matches.forEach(match => {
          match.element.closest('.col-lg-3, .col-lg-4, .col-md-4, .col-md-6').style.display = 'block';
        });
        
        // Hide sections with no visible cards
        teamSections.forEach(section => {
          const visibleCards = section.querySelectorAll('.team-card');
          const hasVisibleCards = Array.from(visibleCards).some(card => 
            card.closest('.col-lg-3, .col-lg-4, .col-md-4, .col-md-6').style.display !== 'none'
          );
          
          section.style.display = hasVisibleCards ? 'block' : 'none';
        });
        
        // If no results found
        if (matches.length === 0) {
          // Show no results message
          const noResultsMessage = document.createElement('div');
          noResultsMessage.className = 'alert alert-info mt-3';
          noResultsMessage.id = 'noResultsMessage';
          noResultsMessage.textContent = `No team members found matching "${query}". Try different keywords.`;
          
          // Remove any existing no results message
          const existingMessage = document.getElementById('noResultsMessage');
          if (existingMessage) {
            existingMessage.remove();
          }
          
          // Add message to the first visible team section, or to the page container
          const mainContent = document.querySelector('.main-content');
          if (mainContent) {
            mainContent.prepend(noResultsMessage);
          }
        } else {
          // Remove any existing no results message
          const existingMessage = document.getElementById('noResultsMessage');
          if (existingMessage) {
            existingMessage.remove();
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
        
        // If search is cleared, show all sections and cards
        if (this.value.trim() === '') {
          teamCards.forEach(card => {
            card.closest('.col-lg-3, .col-lg-4, .col-md-4, .col-md-6').style.display = 'block';
          });
          
          teamSections.forEach(section => {
            section.style.display = 'block';
          });
          
          // Remove any existing no results message
          const existingMessage = document.getElementById('noResultsMessage');
          if (existingMessage) {
            existingMessage.remove();
          }
        }
      });
    }
  }
});