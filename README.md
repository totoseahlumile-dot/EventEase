# EventEase

EventEase is a static multi-page event planning website for students, graduates, young professionals, and event clients. The project is built with plain HTML, CSS, and JavaScript, so it can be opened directly in a browser without installing packages or running a build step.

## Project Structure

```text
EventEase/
├── index.html
├── events.html
├── services.html
├── about.html
├── contact.html
├── FAQ.html
├── styles.css
├── style.css
├── script.js
├── css/
│   └── faq.css
├── js/
│   └── faq.js
├── images/
│   ├── A.jpeg
│   ├── K.jpg
│   ├── KS.jpg
│   ├── MD.JPG
│   ├── MM.jpg
│   ├── MU.jpg
│   ├── SS.jpg
│   └── team.png
└── README.md
```

## Pages

### `index.html`

Home page for EventEase. It includes the main navigation, hero section, search bar, event highlight stats, theme toggle, and footer.

Uses:

- `styles.css`
- `script.js`
- Font Awesome CDN

### `events.html`

Events listing page. It presents the events section of the website and includes its own page markup and inline scripting.

Uses:

- Font Awesome CDN
- Inline CSS and JavaScript

### `services.html`

Services page for student and young professional event packages. It includes service cards, category filters, testimonials, dark mode, a responsive mobile menu, and a booking modal.

Main service categories:

- Social
- Career
- Budget Picks

Services listed:

- House Party Package
- Picnic & Braai Setup
- Networking Mixers
- Graduation Parties
- Birthday Dinners
- Study & Workshop Sessions

Uses:

- Font Awesome CDN
- Inline CSS and JavaScript
- Formspree booking form endpoint
- Unsplash remote images

### `about.html`

About page for EventEase. It introduces the brand, team, and company story.

Uses:

- `style.css`
- Font Awesome CDN
- Inline JavaScript
- Local images from `images/`

### `contact.html`

Contact page for EventEase. It provides contact-focused content and includes its own page styling and scripting.

Uses:

- Inline CSS and JavaScript
- Form/contact-related page markup

### `FAQ.html`

Frequently Asked Questions page. It includes FAQ categories, searchable/filterable questions, accordion behavior, navigation, dark mode, and footer content.

Uses:

- `css/faq.css`
- `js/faq.js`
- Google Fonts
- Font Awesome CDN

## Stylesheets

### `styles.css`

Main stylesheet used by `index.html`. It contains the home page layout, responsive navigation, hero section, reveal animation styles, theme colors, dark mode variables, buttons, cards, and footer styling.

### `style.css`

Stylesheet used by `about.html`. It contains layout and visual styles for the about page and shared EventEase design elements.

### `css/faq.css`

FAQ-specific stylesheet. It contains FAQ page layout, navigation, filters, accordion styling, dark mode, responsive rules, and footer styles.

## JavaScript

### `script.js`

Main shared script used by the home page. It handles:

- SVG icon injection
- Dark and light theme toggle
- Mobile navigation toggle
- Reveal animations with `IntersectionObserver`
- Header scroll state

Theme preference is stored in:

```text
eventease-theme
```

### `js/faq.js`

FAQ page script. It handles:

- FAQ accordion opening and closing
- FAQ search
- FAQ category filters
- Question count updates
- FAQ page mobile navigation
- Theme icon behavior
- Header scroll state

## Images

The `images/` folder stores local assets used across the site, especially team and profile imagery:

- `team.png`
- `A.jpeg`
- `K.jpg`
- `KS.jpg`
- `MD.JPG`
- `MM.jpg`
- `MU.jpg`
- `SS.jpg`

Some pages also load remote images from Unsplash.

## External Dependencies

This project uses CDN-hosted assets:

- Font Awesome icons
- Google Fonts on the FAQ page
- Unsplash images on the services page
- Formspree for the services booking form

No local package manager dependencies are required.

## How To Run

Open any HTML file directly in a browser:

```text
index.html
```

Recommended starting page:

```text
index.html
```

No install step is needed.

## Known Notes

- File naming is inconsistent: the project has `FAQ.html`, but some links use `faq.html`.
- There are two main CSS files, `style.css` and `styles.css`, with similar names.
- Some pages use inline CSS and JavaScript while others use separate files.
- `js/faq.js` should only be loaded on the FAQ page because it expects FAQ-specific elements.
- Several footer characters appear mis-encoded, such as copyright and star symbols.

## Suggested Improvements

- Standardize file names and links, especially `FAQ.html`.
- Move inline CSS into page-specific or shared stylesheet files.
- Move inline JavaScript into separate files.
- Reuse one shared navigation and footer style across all pages.
- Store remote images locally for better reliability.
- Add form success and error states for booking/contact forms.
