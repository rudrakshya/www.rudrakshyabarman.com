# Rudrakshya Barman - Personal Website

This is the personal website of Rudrakshya Barman, a seasoned software engineer and entrepreneur.

## Technologies Used

- React 18
- React Router v6
- TypeScript
- Vite
- Express.js (for serving the production build)
- CSS (no Tailwind CSS or other CSS frameworks)

## Project Structure

```
src/
  components/     # Reusable components
  pages/          # Page components for each route
  main.tsx        # Entry point
  index.css       # Global styles
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production version
- `npm run start` - Start the production server (serves the built files)

## Deployment

The website can be deployed to any static hosting service that supports client-side routing (like Netlify, Vercel, or GitHub Pages) or to a Node.js server using the Express server included in the project.

## Development

To start developing:

1. Install dependencies: `npm install`
2. Start the development server: `npm run dev`
3. Open your browser to http://localhost:5173

## Building for Production

To create a production build:

1. Run `npm run build`
2. The built files will be in the `dist/` directory
3. To serve the built files locally, run `npm run start`

## Features

- Responsive design
- Client-side routing with React Router
- SEO-friendly structure
- Modern UI with a professional color scheme
- Pages for Home, About, Projects, and Contact

## Troubleshooting

### PowerShell Execution Policy Error

If you encounter an error like:
```
npm : File C:\\Program Files\\nodejs\\npm.ps1 cannot be loaded because running scripts is disabled on this system.
```

This is due to PowerShell's execution policy. You can resolve this by:

1. Open PowerShell as Administrator
2. Run the command: `Set-ExecutionPolicy RemoteSigned`
3. Type `Y` and press Enter to confirm

Alternatively, you can use Command Prompt instead of PowerShell to run the npm commands.

### Alternative Ways to Run Commands

If you continue to have issues with PowerShell, you can:

1. Use Command Prompt (cmd) instead of PowerShell
2. Use Git Bash if you have Git installed
3. Use the integrated terminal in your code editor (VS Code, etc.)

## Author

Rudrakshya Barman - Seasoned Software Engineer & Entrepreneur