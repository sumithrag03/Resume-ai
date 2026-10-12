# 0 to Shipped – Resume Parser

A polished, responsive landing page and PDF upload demo for job seekers. Select a PDF to explore an illustrative resume score, sample skills, and general suggestions.

## Features

- Responsive navigation with links to the upload and How It Works sections
- PDF drag-and-drop and file picker, with PDF type and 10 MB size validation
- File name and size preview, remove and replace actions
- Loading state followed by a sample results dashboard
- Example resume score, skills, and general improvement suggestions
- Accessible controls, keyboard focus styles, and reduced-motion support

## Technology

- React 18 and JavaScript
- Vite
- CSS
- Lucide React icons

## Installation and running

Install [Node.js](https://nodejs.org/) if it is not already available. Open this project folder in VS Code, then open **Terminal → New Terminal** and run:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in your browser. To create a production build, run `npm run build`.

## Project structure

```text
public/
  favicon.svg
src/
  components/
    AnalysisResults.jsx
    Footer.jsx
    Hero.jsx
    HowItWorks.jsx
    Navbar.jsx
    ResumeUploader.jsx
    ScoreCard.jsx
    SkillsSection.jsx
  App.jsx
  index.css
  main.jsx
index.html
package.json
```

## Demo data and privacy

All results are fixed sample data, clearly labeled as illustrative. The demo does not read, parse, upload, or analyze the contents of the selected resume. File selection and validation happen locally in the browser; there is no backend, API, or database.
