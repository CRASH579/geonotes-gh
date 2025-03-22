# GeoNotes React

A modern web application for creating and sharing location-based notes. Built with React, Firebase, and Google Maps.

## Features

- 🔐 User authentication with email/password and Google Sign-in
- 🗺️ Interactive Google Maps interface
- 📝 Create and view location-based notes
- 👥 Share notes with other users
- 📱 Responsive design for all devices

## Tech Stack

- React 18
- Vite
- Firebase (Authentication & Firestore)
- Google Maps API
- TailwindCSS
- React Router v6

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- Firebase project with Authentication and Firestore enabled
- Google Maps API key

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/geonotes-react.git
cd geonotes-react
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run format` - Format code with Prettier

## Deployment

The application is configured for deployment to GitHub Pages. To deploy:

1. Push your changes to the main branch
2. The GitHub Actions workflow will automatically build and deploy to the gh-pages branch

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Google Maps Platform
- Firebase
- React Team
- TailwindCSS Team
