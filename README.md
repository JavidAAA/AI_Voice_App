# AI Voice Studio SaaS

🚀 Build an AI Voice Studio SaaS with Next.js 16, Python, Neon, Polar, Modal & Better Auth

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![Python](https://img.shields.io/badge/Python-3.11-blue)](https://www.python.org/)
[![Modal](https://img.shields.io/badge/Modal-Serverless-orange)](https://modal.com/)
[![Neon](https://img.shields.io/badge/Neon-PostgreSQL-green)](https://neon.tech/)
[![Polar](https://img.shields.io/badge/Polar-Payments-blue)](https://polar.sh/)
[![Better Auth](https://img.shields.io/badge/Better%20Auth-Authentication-red)](https://better-auth.com/)

## 🔗 Quick Links

- **Neon** → https://get.neon.com/dadagxp
- **Modal** → https://bit.ly/4j1oyWJ
- **Eraser Diagram** → https://app.eraser.io/workspace/kLqXSZ6CIxZrJdeYMRt2?origin=share

## 📋 Overview

Welcome to the AI Voice Studio SaaS application! This is a production-ready platform that combines a modern Next.js 16 frontend with a powerful Python backend for AI-powered text-to-speech generation. The application features secure authentication, payment processing, real-time audio generation, and a comprehensive project management system.

### 🎯 What You'll Learn

This project demonstrates how to bridge frontend web development with AI backend engineering using Python, covering:

- Full-stack development with Next.js 16 and Python
- Serverless AI compute with Modal
- Database management with Neon and Prisma
- Payment integration with Polar
- Authentication with Better Auth
- Cloud storage with AWS S3
- Real-time audio processing and playback

## ✅ Key Features

### 🔐 Authentication & Security

- Secure user authentication with email & social logins using Better Auth
- Session management and protected routes
- Account security settings

### 💰 SaaS Monetization

- Credits-based system for AI generation
- Payment processing with Polar
- Subscription management and billing
- Customer portal for invoices and payments

### 🎵 AI Text-to-Speech Generation

- Serverless AI TTS using Python & Modal
- Support for multiple languages and voices
- Real-time audio generation and playback
- Custom voice cloning capabilities

### 📁 Project Management

- Save and organize generated voice files
- Audio project history and management
- Voice sample uploads and management

### 🎨 User Interface

- Professional dashboard with Tailwind CSS
- Responsive design for all devices
- Real-time audio playback controls
- File upload and management interface

## 🧠 Tech Stack

### Frontend

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Sonner** - Toast notifications
- **Better Auth UI** - Authentication components

### Backend

- **Python 3.11** - AI processing and logic
- **Modal** - Serverless compute platform
- **Chatterbox** - Multilingual TTS model
- **Torch/Torchaudio** - Audio processing

### Database & Storage

- **Neon** - Serverless PostgreSQL
- **Prisma** - Database ORM and migrations
- **AWS S3** - Cloud storage for audio files

### Payments & Auth

- **Polar** - Payment processing and subscriptions
- **Better Auth** - Authentication and session management

## 🏗️ Architecture

### Project Structure

```
ai-voice-studio-app/
├── frontend/                 # Next.js 16 application
│   ├── src/
│   │   ├── app/             # App Router pages and layouts
│   │   ├── components/      # Reusable React components
│   │   ├── lib/             # Utility functions and configurations
│   │   ├── actions/         # Server actions for data operations
│   │   └── types/           # TypeScript type definitions
│   ├── prisma/              # Database schema and migrations
│   └── public/              # Static assets
├── backend/                 # Python backend services
│   └── text-to-speech/      # Modal-based TTS service
└── README.md
```

### Data Flow

1. **User Authentication**: Better Auth handles login/signup and session management
2. **Text Input**: User enters text and selects voice/language options
3. **API Call**: Frontend calls Modal endpoint via server action
4. **AI Processing**: Python backend generates audio using Chatterbox TTS model
5. **Storage**: Generated audio is saved to AWS S3
6. **Database**: Project metadata is stored in Neon via Prisma
7. **Playback**: Audio is streamed back to user for immediate playback

### Key Components

#### Frontend (`/frontend`)

- **Authentication**: `auth-client.ts`, `auth.ts` - Better Auth configuration
- **TTS Actions**: `actions/tts.ts` - Server actions for speech generation
- **Voice Upload**: `actions/voice-upload.ts` - Custom voice management
- **UI Components**: Reusable components in `/components/ui/`
- **Types**: TypeScript definitions in `/types/tts.ts`

#### Backend (`/backend/text-to-speech`)

- **Modal Service**: `tts.py` - Serverless TTS generation
- **Model Loading**: Chatterbox multilingual TTS model
- **Audio Processing**: Torch-based audio generation and saving
- **S3 Integration**: Direct upload to AWS S3 buckets

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Python 3.11+
- Modal account
- Neon database
- AWS account (for S3)
- Polar account (for payments)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/sahandghavidel/ai-voice-studio-app.git
   cd ai-voice-studio-app
   ```

2. **Frontend Setup**

   ```bash
   cd frontend
   npm install
   ```

3. **Environment Variables**

   Create `.env` file in `/frontend`:

   ```env
   DATABASE_URL="your-neon-connection-string"
   BETTER_AUTH_SECRET="your-better-auth-secret"
   BETTER_AUTH_URL="http://localhost:3000"
   POLAR_ACCESS_TOKEN="your-polar-token"
   POLAR_WEBHOOK_SECRET="your-polar-webhook-secret"
   AWS_ACCESS_KEY_ID="your-aws-key"
   AWS_SECRET_ACCESS_KEY="your-aws-secret"
   AWS_REGION="your-aws-region"
   AWS_S3_BUCKET_NAME="your-s3-bucket"
   MODAL_API_URL="your-modal-endpoint"
   MODAL_API_KEY="your-modal-key"
   MODAL_API_SECRET="your-modal-secret"
   ```

4. **Database Setup**

   ```bash
   cd frontend
   npx prisma generate
   npx prisma db push
   ```

5. **Backend Setup**

   ```bash
   cd ../backend/text-to-speech
   python3 -m venv venv
   source venv/bin/activate  # On macOS/Linux
   pip install -r requirements.txt
   modal deploy tts.py
   ```

6. **Run the Application**

   ```bash
   cd ../../frontend
   npm run dev
   ```

   Visit `http://localhost:3000` to see the application.

## 📖 Usage

### Generating Speech

1. Sign up/login to your account
2. Navigate to the Create page
3. Enter your text and select language/voice options
4. Click "Generate Speech"
5. Listen to the generated audio or download it

### Managing Projects

- View all your generated audio projects in the dashboard
- Organize and search through your voice files
- Upload custom voice samples for cloning

### Account Management

- Update your profile and security settings
- View billing history and manage subscriptions
- Monitor your credit usage

## 🔧 Development

### Available Scripts

```bash
# Frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npx prisma studio    # Open Prisma Studio
npx prisma migrate   # Run database migrations

# Backend
modal deploy tts.py  # Deploy TTS service
modal logs           # View deployment logs
```

### Testing the API

```bash
curl -H "Modal-Key: your-modal-key" \
     -H "Modal-Secret: your-modal-secret" \
     -H "Content-Type: application/json" \
     -X POST your-modal-endpoint \
     -d '{"text": "Hello world", "language": "en"}'
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📎 Useful Links

- **Neon** → https://get.neon.com/dadagxp
- **Modal** → https://bit.ly/4j1oyWJ
- **Polar** → https://polar.sh
- **Better Auth** → https://better-auth.com
- **GitHub Repo** → https://github.com/sahandghavidel/ai-voice-studio-app
- **Eraser Diagram** → https://app.eraser.io/workspace/kLqXSZ6CIxZrJdeYMRt2?origin=share

## 🙏 Acknowledgments

- Built with ❤️ by [Sahand Ghavidel](https://github.com/sahandghavidel)
- Special thanks to the open-source community

---

If you find this project helpful, please give it a ⭐ on GitHub!

#nextjs16 #python #ai #saas #fullstackdevelopment #aws
