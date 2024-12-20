# Admin CMS

A Next.js-based admin CMS with Firebase authentication, TOTP 2FA, and modern UI components.

## Prerequisites

- Node.js 16.x or later or yarn
 Firebase account
 Environment variables setup
## Setup Instructions
### 1. Firebase Setup
1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
. Enable Authentication and Firestore in your project
. Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_ENCRYPTION_KEY=your_encryption_key
```


4. Set up Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
match /databases/{database}/documents {
match /{document=} {
allow read, write: if request.auth != null;
}
}
}
```

### 2. TOTP (2FA) Setup

The project uses `otplib` for TOTP implementation. The setup is already included in the codebase, but you'll need to:

1. Enable Authentication in Firebase Console
2. Users can enable 2FA from the Settings page
3. QR code scanning is supported with most authenticator apps:
   - Google Authenticator
   - Authy
   - Microsoft Authenticator

### 3. Adding Icons to the Project

This project uses Heroicons. To add new icons:

1. Install Heroicons if not already installed:
```bash
npm install @heroicons/react
```

2. Import icons from the appropriate directory:
```typescript
import { IconName } from '@heroicons/react/24/outline'
// or
import { IconName } from '@heroicons/react/24/solid'
```

3. Use in components:
```typescript
<IconName className="h-6 w-6" />
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Build for production:
```bash
npm run build
# or
yarn build
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/       # React contexts
├── lib/           # Library configurations
├── pages/         # Next.js pages
├── services/      # Firebase and other services
├── styles/        # Global styles
├── types/         # TypeScript types
└── utils/         # Utility functions
```

## Features

- 🔐 Firebase Authentication
- 🔒 Two-Factor Authentication (TOTP)
- 🎨 Tailwind CSS styling
- 🎯 TypeScript support
- 📱 Responsive design
- 🔄 Real-time updates
- 🌓 Dark mode support
- 🚀 Next.js 14

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details