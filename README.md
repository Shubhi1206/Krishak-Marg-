Krishak Marg is a farmer-focused web application designed to bring
useful agricultural information and digital tools together in one
simple, multilingual platform.

The project provides farmers with access to crop advisory, weather
information, agricultural market categories, government scheme
information, agricultural news alerts, profile management, and
camera-based media features. The interface supports English, Hindi,
and Punjabi.

✨ Features

Farmer Login & Registration

Mobile-number based login flow with OTP interface

Farmer profile details such as name, location, farm size, and
crops grown

Local session/profile handling

Crop Advisory

AI advisory interface for personalized crop guidance

Agricultural expert consultation interface

Weather Information

Current temperature, weather condition, humidity, and wind speed

3-day forecast with rainfall probability

Mandi / Agricultural Products

Categories for seeds, fertilizers & pesticides, and farming
tools

Interface prepared for agricultural product and price
information

Government Schemes

Displays agricultural government schemes

Scheme status, benefits, dates, and application-related
interface

Agricultural News & Alerts

Weather, government, and market-related alerts

Multilingual alert content

Camera & Media Tools

Capture crop or pest images

Document scanning interface

Audio recording

Video recording

Front/rear camera switching

Multilingual Support

English

Hindi

Punjabi

Farmer Profile

View farmer information

Manage profile-related options

Logout functionality

Subscription & Feedback

Subscription-plan interface

Feedback form with category and rating options

Responsive Modern UI

React-based component architecture

Tailwind CSS styling

Reusable UI components

Light/dark theme support

🛠️ Tech Stack

Frontend

React 18

TypeScript

Vite

Tailwind CSS

Wouter

TanStack React Query

Radix UI

Lucide React

Backend

Node.js

Express.js

TypeScript

Database

PostgreSQL

Neon Serverless

Drizzle ORM

Drizzle Kit

Other Technologies

Zod / Drizzle-Zod for validation

Web Media APIs for camera, audio, and video functionality

Git & GitHub

📁 Project Structure

KisaanMitra/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   └── index.html
│
├── server/
│   ├── db.ts
│   ├── index.ts
│   ├── routes.ts
│   ├── storage.ts
│   └── vite.ts
│
├── shared/
│   └── schema.ts
│
├── attached_assets/
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json

🚀 Getting Started

1. Clone the repository

git clone <your-repository-url>
cd KisaanMitra

2. Install dependencies

npm install

3. Configure environment variables

Create a .env file and add the required database configuration:

DATABASE_URL=your_postgresql_connection_string

Add any other API credentials required when replacing the project's
demo/mock data with production services.

4. Set up the database

npm run db:push

5. Run the application

npm run dev

The application will start using the development server configured in
the project.

📜 Available Scripts

Command             Description

npm run dev       Start the development server
npm run build     Build the frontend and backend
npm start         Run the production build
npm run check     Run TypeScript checks
npm run db:push   Push the Drizzle schema to the database

🌐 Supported Languages

Language   Code

Hindi      hi
English    en
Punjabi    pa

Hindi is configured as the default application language.

🗄️ Database Schema

The project includes PostgreSQL/Drizzle schemas for:

farmers --- farmer profile and farming information

otp_verifications --- OTP verification records

users --- legacy user schema retained for compatibility

🔐 Authentication

The current project contains a mobile-number + OTP user flow on the
frontend. The OTP verification and several other application services
currently use demo/mock behavior and are structured to be connected to
real APIs/services later.

⚠️ Current Implementation Notes

This repository is a working project/prototype. Some modules currently
use mock data or placeholder handlers, including:

Weather data

Government scheme data

Agricultural news

Subscription plans

AI crop advisory

Agricultural expert consultation

Mandi/product information

Feedback submission

OTP sending/verification

These modules can be connected to production APIs and services as the
project is developed further.

🔮 Future Enhancements

Integrate live weather APIs

Add real-time mandi prices

Connect government scheme data to official sources

Implement a production OTP authentication service

Add an AI-powered crop advisory/chat system

Add crop disease detection using image analysis

Integrate real agricultural expert consultations

Add voice-based assistance for farmers

Add real subscription/payment integration

Add push notifications for weather and agricultural alerts

Expand regional language support

Deploy the application for production use

🎯 Project Goal

KisaanMitra aims to make agricultural information easier to access by
bringing important farming resources into a single, farmer-friendly
digital platform.

👩‍💻 Project Type

Academic / Full-Stack Web Development Project

Built using React, TypeScript, Node.js, Express, PostgreSQL, and
Drizzle ORM.

📄 License

This project is licensed under the MIT License.
