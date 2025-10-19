# Abstract Image Generator Feature

## Overview
The Abstract Image Generator transforms imaginary words into dreamlike, abstract visual art using AI. Each generated image is designed to be open to interpretation, evoking curiosity and imagination.

## Features
- **Word-to-Image Generation**: Enter any imaginary word and generate unique abstract art
- **Dreamlike Aesthetics**: Soft gradients, blurred organic forms, atmospheric lighting
- **Multiple Interpretations**: Images designed to be seen differently by different viewers
- **Download Capability**: Save generated images to your device
- **Admin-Only Access**: Integrated into the Admin Panel for controlled usage

## How It Works

### Frontend Component
- **Location**: Integrated into `components/AdminPanel.tsx`
- **Access**: Admin Panel → Settings Tab → Abstract Image Generator section

### Backend Endpoint
- **Endpoint**: `POST /api/generate-abstract-image`
- **Request Body**: `{ word: string }`
- **Response**: `{ image: string }` (base64 encoded PNG)

### Prompt Template
The feature uses a specific prompt template designed for abstract, dreamlike imagery:

```
Generate an abstract, dreamlike image inspired by the imaginary word: "{WORD}". 
The image should be open to multiple interpretations, allowing different viewers to see different shapes, objects, or emotions. 
Avoid clear or literal objects. 
Use a soft, ethereal, mysterious visual style with subtle gradients, blurred organic forms, flowing contrast, and atmospheric lighting. 
The overall mood should provoke curiosity and imagination rather than define anything concrete.
Ultra high resolution, cinematic feel, slightly surreal.
```

## Usage

1. Open the Admin Panel (click Admin button in header)
2. Login with admin credentials
3. Go to the Settings tab
4. Find the "Abstract Image Generator" section
5. Enter an imaginary word (e.g., "Veloria", "Zynthara", "Lumivex")
6. Click "Generate" or press Enter
7. Wait for the AI to create your abstract image
8. Download or clear to generate another

## Technical Details

- **AI Model**: Gemini 2.5 Flash Image
- **Image Format**: PNG (base64 encoded)
- **API**: Google Generative AI
- **Frontend**: React + TypeScript + Framer Motion
- **Backend**: Express.js

## Files Modified/Created

### Modified Files
- `components/AdminPanel.tsx` - Added Abstract Image Generator section
- `server/index.mjs` - Added `/api/generate-abstract-image` endpoint
- `ABSTRACT_IMAGE_FEATURE.md` - This documentation

## Example Words to Try
- Veloria
- Zynthara
- Lumivex
- Ethereon
- Mystara
- Dreamora
- Celestrix
- Nebulith

## Notes
- Generation typically takes 5-15 seconds
- Requires valid GEMINI_API_KEY in .env.local
- Each generation creates a unique interpretation
- Images are not stored server-side
