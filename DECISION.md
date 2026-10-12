# Project: 0 to Shipped – Resume Parser

Build a modern, professional, fully responsive React landing page for a resume parser application called **“0 to Shipped – Resume Parser.”**

The application should allow users to upload a PDF resume and view a mock resume score, skills found, and missing skills.

This is a frontend-only demo project. No backend server or database is required.

## 1. Technology Stack

Use the following technologies:

- React.js
- Vite
- JavaScript (ES6+)
- HTML5 and JSX
- CSS3
- React Hooks (`useState`, `useRef`)
- Lucide React for icons (optional)

Do not use TypeScript, Next.js, Tailwind CSS, or any backend framework.

Create a clean, component-based React application with reusable components.

## 2. Project Structure

Organize the project as follows:

```text
0-to-shipped-resume-parser/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── ResumeUploader.jsx
│   │   ├── AnalysisResults.jsx
│   │   ├── ScoreCard.jsx
│   │   ├── SkillsSection.jsx
│   │   ├── HowItWorks.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── README.md
```

## 3. Design Direction

Create a premium SaaS-style interface inspired by modern developer tools and productivity applications.

Design requirements:

- Minimal, elegant, professional layout
- Light background with navy text and blue or violet accents
- White cards with subtle shadows
- Rounded corners and generous spacing
- Modern typography and consistent font sizes
- Smooth hover effects and transitions
- Attractive progress indicators and skill tags
- Responsive design for desktop, tablet, and mobile
- Accessible colors and keyboard-friendly controls

Avoid clutter, excessive gradients, and unnecessary animations.

## 4. Navbar Component

Create a responsive navigation bar containing:

- Brand name: **0 to Shipped**
- Small label: Resume Parser
- Navigation link: How It Works
- Primary button: Analyze Resume

Requirements:
- Clicking “How It Works” scrolls to that section.
- Clicking “Analyze Resume” scrolls to the upload section.
- Make the navbar sticky at the top.
- Ensure the mobile layout works correctly.

## 5. Hero Component

Heading:

**Turn Your Resume Into Your Next Opportunity.**

Supporting text:

“Discover your resume score, identify your strongest skills, and find the skills you may need to improve.”

Add a small badge:

“YOUR RESUME, SIMPLIFIED”

Include a prominent call-to-action button:

**Analyze My Resume**

The button should smoothly scroll to the PDF upload area.

Keep the hero visually balanced, with a clear heading, supporting text, and a simple decorative illustration or resume preview card created with HTML and CSS.

## 6. ResumeUploader Component

Build a polished PDF upload interface.

Include:
- Drag-and-drop upload area
- PDF document icon
- Text: “Drop your resume here”
- Supporting text: “or browse files from your device”
- Button: “Choose PDF”
- File size limit: 10 MB
- Accepted file type: PDF only

Functional requirements:

1. Allow users to select a PDF file using the file input.
2. Support drag-and-drop uploads.
3. Validate the file extension and MIME type.
4. Reject files larger than 10 MB.
5. Display the selected filename and file size.
6. Show a PDF icon beside the filename.
7. Provide a remove button to remove the selected file.
8. Allow users to replace the selected file.
9. Display friendly error messages for invalid files.
10. Disable the Analyze Resume button until a valid PDF is selected.

Use React state to manage the selected file, validation errors, and loading status.

## 7. Mock Resume Analysis

When the user clicks **Analyze Resume**:

1. Display a loading animation for approximately 1–2 seconds.
2. Show a message such as “Preparing your demo results...”
3. Display the analysis dashboard below the uploader.
4. Smoothly scroll to the results section.

Important:
- This is a frontend-only mockup.
- Do not build a backend, database, API, or real AI integration.
- Do not pretend to extract or analyze the uploaded PDF's contents.
- Use clearly labeled sample data for all results.
- Display a visible label: **“DEMO RESULTS — SAMPLE DATA”**.
- Keep the upload interaction functional even though the analysis is simulated.

## 8. AnalysisResults Component

Create an attractive resume analysis dashboard.

### A. Overall Resume Score

Display a prominent score card:

- Score: `78/100`
- Label: “Good Progress”
- Circular progress ring or animated progress bar
- Supporting text: “Your illustrative demo score”

The score must be sample data, not a score calculated from the uploaded PDF.

### B. Skills Found

Display a card titled:

**Skills Found**

Supporting text:

“Example skills that may appear in a resume.”

Show sample skills as rounded green or blue tags:

- HTML
- CSS
- JavaScript
- Python
- SQL
- Git
- Responsive Design

Include a count of 7 skills.

### C. Missing Skills

Display a card titled:

**Skills to Improve**

Supporting text:

“Example skills you could consider developing.”

Show sample missing skills as contrasting orange or neutral tags:

- React
- TypeScript
- REST APIs
- Testing

Include a count of 4 skills.

Do not claim these skills are actually present or missing from the uploaded PDF.

### D. Summary Cards

At the top of the results dashboard, display three compact cards:

1. Resume Score — 78/100
2. Skills Found — 7
3. Skills to Improve — 4

Use suitable icons, subtle backgrounds, and responsive card layouts.

### E. Improvement Suggestions

Add a section titled:

**Ways to Strengthen Your Resume**

Show these sample recommendations:

- Highlight relevant technical skills.
- Include clear project descriptions and measurable results.
- Organize the resume using standard headings.
- Keep formatting consistent and easy to read.
- Include relevant skills in your project descriptions.

Label these recommendations as general demo suggestions, not personalized findings from the PDF.

### F. Analyze Another Resume

At the bottom of the results dashboard, add a button:

**Analyze Another Resume**

When clicked:
- Clear the selected file.
- Reset the mock results.
- Clear any validation errors.
- Reset the loading state.
- Scroll back to the upload section.

## 9. HowItWorks Component

Create a three-step section with attractive cards.

**Step 1: Upload Your Resume**

“Choose a PDF resume from your device.”

**Step 2: Explore Your Results**

“Preview a sample resume score and example skills.”

**Step 3: Improve Your Profile**

“Explore general suggestions to strengthen your resume.”

Use simple icons and a responsive layout.

## 10. Footer Component

Include:

- Brand: 0 to Shipped
- Description: “A simple resume analysis demo built for job seekers.”
- Navigation links to How It Works and Analyze Resume
- Copyright text with the current year

Keep the footer minimal and professional.

## 11. React Functionality

Implement all interactions using React and JavaScript:

- PDF file selection
- Drag-and-drop uploads
- File type and size validation
- File information display
- Remove and replace file
- Loading state
- Mock analysis results
- Score progress animation
- Skills found and missing skills display
- Smooth scrolling
- Reset and analyze-again functionality
- Responsive mobile navigation

Use reusable components and pass data through props where appropriate.

Avoid unnecessary dependencies and direct DOM manipulation. Use React state and refs for application behavior.

## 12. CSS Requirements

Use `src/index.css` for global styles and component styles.

Include:

- CSS variables for colors, spacing, shadows, and border radii
- Responsive grid and flexbox layouts
- Mobile-first media queries
- Smooth transitions
- Focus-visible styles for keyboard navigation
- Accessible button and form styles
- Circular score indicator using CSS conic gradients or SVG
- Consistent spacing and typography
- Reduced-motion support using `prefers-reduced-motion`

Ensure the page works at desktop, tablet, and mobile widths.

## 13. SEO and HTML Setup

Update `index.html` with:

- Page title: “0 to Shipped – Resume Parser”
- Meta description: “Explore a demo resume score, example skills, and general resume improvement suggestions.”
- Viewport meta tag
- Appropriate favicon reference

Use semantic HTML and meaningful accessible labels.

## 14. README.md

Create a README file containing:

- Project overview
- Features
- Technology stack
- Installation instructions
- How to run the project
- Project structure
- Explanation that all analysis results are mock data

Include these commands:

```bash
npm install
npm run dev
```

## 15. Expected Result

Deliver a complete, runnable React + Vite project.

The final application must include:

- A polished landing page
- A functional PDF upload interface
- File validation
- A mock resume score out of 100
- Example skills found
- Example skills to improve
- General improvement suggestions
- Responsive design
- Reusable React components
- No backend or database
- No ATS score or ATS compatibility section

Generate all required files with complete working code. Do not provide incomplete snippets, pseudocode, or placeholders for the required functionality.

After generating the code, explain how to install dependencies and run the project locally in VS Code.

## New Feature: Job Description Input and Resume Matching

Update my existing React + Vite project, **0 to Shipped – Resume Parser**, to include a Job Description input feature.

Keep the existing design, components, and styling consistent. Do not rebuild the entire project from scratch.

### 1. Job Description Section

Add a section titled **"Compare Your Resume With a Job Description"** below the resume PDF uploader.

Include:

- A large textarea where users can paste a job description.
- Placeholder text: "Paste the job description here, including required skills, qualifications, and responsibilities..."
- A character counter.
- A clear button to remove the pasted text.
- An optional sample job description button for testing.
- A label: "Job Description".

### 2. Analyze Button

The user must provide both:
- A valid PDF resume under 10 MB.
- A non-empty job description.

Enable the **Analyze Resume** button only when both inputs are valid.

Show friendly validation messages if either input is missing.

### 3. Resume Analysis Results

After clicking Analyze Resume, display a loading animation and then show clearly labeled mock results.

**A. Resume Score**
- Show an illustrative score out of 100.
- Example: 78/100.
- Display a progress ring and a short status label.

**B. Matching Skills**

Display skills that match between the sample resume results and the job description.

Example:
- HTML
- CSS
- JavaScript
- SQL

**C. Missing Skills**

Display example skills that appear in the job description but are not present in the sample resume results.

Example:
- React
- TypeScript
- REST APIs
- Automated Testing

**D. Job Description Summary**

Display:
- Total example required skills.
- Matching skills count.
- Missing skills count.

**E. Improvement Suggestions**

Show general suggestions based on the example skill gaps, such as:
- Add relevant skills to your resume when you genuinely possess them.
- Highlight projects that demonstrate the job's requirements.
- Include measurable achievements.
- Use clear, standard section headings.

Do not recommend adding skills the candidate does not actually have.

### 4. Mock Analysis Logic

This is a frontend-only demonstration.

- Do not build a backend, database, or external AI integration.
- Do not claim to extract actual text or skills from the uploaded PDF.
- Treat the uploaded PDF as a file-selection input only.
- Use a predefined list of sample resume skills.
- Extract relevant keywords from the pasted job description using simple JavaScript keyword matching.
- Compare the detected job-description keywords with the predefined sample resume skills.
- Calculate a demonstration match score from the matching and missing skill counts.
- Clearly label all results as "Demo Analysis — Sample Resume Data".
- Display a note explaining that the uploaded PDF's actual contents are not analyzed.

Use a deterministic scoring formula for the demo. For example:

Match Score = (Matching Skills / Total Recognized Job Skills) × 100

Round the result to the nearest whole number. If no recognized skills are found, show a helpful message instead of dividing by zero.

Use keyword matching only for recognized skills. Do not pretend that simple keyword matching evaluates the entire resume or predicts an employer's ATS decision.

### 5. User Experience

- Make the textarea responsive.
- Preserve the existing premium SaaS design.
- Display the results below the input section.
- Add an "Analyze Another Job" button that resets the job description and results.
- Allow the user to change the job description and analyze again.
- Ensure the page works on desktop, tablet, and mobile.

### 6. React Implementation

Update the relevant existing files, especially:
- `src/components/ResumeUploader.jsx`
- `src/components/AnalysisResults.jsx`
- `src/App.jsx`
- `src/index.css`

Create an additional component such as `JobDescriptionInput.jsx` if appropriate.

Use React state and reusable components. Keep HTML, CSS, and JavaScript within the existing React + Vite architecture.

Do not add an ATS score or ATS compatibility section.

Implement the complete feature with working interactions and explain how to test it locally.
