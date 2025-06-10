# GiGi - A Tribute to Gigi D'Agostino

This project is a heartfelt tribute to the legendary DJ and producer Gigi D'Agostino, aiming to create an immersive and interactive experience for fans. It's built with [Next.js](https://nextjs.org) and features a dynamic visualizer powered by [Three.js](https://threejs.org/).

## Project Vision

The vision behind GiGi is to celebrate the timeless music of Gigi D'Agostino by crafting a unique digital space where fans can connect with his iconic tracks in a new way. We're leveraging modern web technologies to bring the energy of his music to life through captivating visuals and interactive elements.

## Key Features

### The Dance Area
The centerpiece of this project is the "Dance Area" – an interactive music visualizer.
- **Immersive Experience**: Designed to draw you into the music with a full-screen, audio-reactive environment.
- **Three.js Powered Fireflies**: A custom `FirefliesScene.tsx` component generates a mesmerizing display of fireflies that dance and react to the currently playing track. The intensity, color, and movement of the fireflies are synchronized with the audio's bass, mid, and high frequencies.
- **Interactive Controls**: Users can play/pause the music, and toggle a fullscreen mode for maximum immersion.
- **Responsive Design**: Adapts to different screen sizes, with optimizations for mobile and desktop experiences.
- **Dynamic Backgrounds**: The `DanceArea.tsx` component orchestrates various visual layers, including animated gradients, particle effects, and shimmer overlays, enhancing the rave-like atmosphere.

## Technology Stack

- **Frontend Framework**: [Next.js](https://nextjs.org) (App Router)
- **3D Graphics**: [Three.js](https://threejs.org)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start exploring the main interactive component in `src/components/DanceArea.tsx` and the Three.js magic in `src/components/FirefliesScene.tsx`. The page auto-updates as you edit the files.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Three.js Documentation](https://threejs.org/docs/) - discover the world of 3D graphics on the web.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - for utility-first CSS.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
