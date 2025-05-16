# NUSU Academics Website

A comprehensive website for the National University Student Union (NUSU) Academics department to support students' academic journeys.

## Features

- Responsive design with fixed left sidebar (collapsible on mobile)
- Academic resources library (YouTube videos, PDFs, links) with search functionality
- Interactive FullCalendar for academic deadlines and events
- Team profiles with detailed information cards
- Contact form for student inquiries
- Dark/light mode toggle for accessibility
- Integration with Jekyll for content management
- Google Analytics for tracking user engagement

## Technologies Used

- HTML, CSS, JavaScript
- Bootstrap 5.3.0
- Google Fonts (Roboto, Montserrat)
- FullCalendar for deadlines calendar
- Lunr.js for search functionality
- AOS for smooth animations
- Formspree for form submissions

## Project Structure

```
nusu-academics/
├── index.html                  # Homepage
├── resources.html              # Academic resources page
├── deadlines.html              # Deadlines calendar page
├── team.html                   # Team members page
├── contact.html                # Contact information and form
├── css/
│   └── styles.css              # Main stylesheet
├── js/
│   ├── scripts.js              # Core JavaScript functionality
│   ├── home.js                 # Homepage specific scripts
│   ├── resources.js            # Resources page scripts
│   ├── deadlines.js            # Deadlines page scripts
│   ├── team.js                 # Team page scripts
│   ├── contact.js              # Contact page scripts
│   ├── searchData.json         # Search data for Lunr.js
│   └── deadlines.json          # Deadlines data for calendar
├── assets/
│   ├── images/                 # Images directory
│   ├── videos/                 # Videos directory
│   └── files/                  # PDF and document files
└── _data/                      # Jekyll data files (for production)
    ├── team.yml                # Team members data
    └── deadlines.yml           # Deadlines data
```

## Local Development

To run this website locally for development:

1. Clone the repository
2. Navigate to the project directory
3. Start a local server:
   ```
   npx http-server
   ```
4. Open your browser and go to `http://localhost:8080`

## Deployment to GitHub Pages

To deploy this website to GitHub Pages:

1. Create a new GitHub repository named `nusu-academics`
2. Push your project to the repository
3. Go to the repository settings
4. Under "GitHub Pages", select the `main` branch as the source
5. The website will be available at `https://your-username.github.io/nusu-academics`

## Performance and Accessibility

The website follows WCAG 2.1 guidelines for accessibility and has been optimized for performance:

- All images include alternative text and are optimized
- Color contrast ratios meet accessibility standards
- Fonts are readable and responsive
- JavaScript is modular and minified for production
- CSS is optimized and follows best practices

## Future Enhancements

Potential future enhancements include:

- Integration with university systems for real-time data
- User accounts for personalized experiences
- Mobile app version using Progressive Web App technology
- Interactive study tools and resources
- Integration with learning management systems

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Created for the National University Student Union (NUSU) Academics Department.