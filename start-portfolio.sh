#!/bin/bash

echo "🚀 Starting Narayanan's Portfolio..."
echo "📁 Checking if we're in the right directory..."

if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from your portfolio directory."
    exit 1
fi

echo "✅ Found package.json"
echo "📦 Installing dependencies if needed..."
npm install

echo "🌐 Starting development server..."
echo "📱 Your portfolio will be available at: http://localhost:3000"
echo "🔄 Press Ctrl+C to stop the server when you're done"
echo ""

npm start 