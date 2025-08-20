# Portfolio Setup Guide

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## Email Generation Feature Setup

To enable the email generation feature, you need to:

1. Get a Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a `.env` file in the root directory
3. Add your API key:
   ```
   REACT_APP_GEMINI_API_KEY=your_actual_api_key_here
   ```
4. Restart the development server

## Troubleshooting

### If the page doesn't load:
- Make sure all dependencies are installed: `npm install`
- Check the browser console for errors
- Ensure you're running `npm start` from the project directory

### If styles don't appear:
- The project uses Tailwind CSS which should work automatically
- If you see unstyled content, try clearing your browser cache

### If email generation doesn't work:
- Check that you've added your API key to the `.env` file
- Ensure the `.env` file is in the root directory (same level as package.json)
- Restart the development server after adding the API key

## Build for Production

To create a production build:
```bash
npm run build
```

This will create an optimized build in the `build` folder that you can deploy to any static hosting service. 