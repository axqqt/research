"use server";
import { ElevenLabsClient } from "elevenlabs";
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const client = new ElevenLabsClient({ apiKey: process.env.ELEVEN_LABS_API_KEY });
    
    const voices = await client.voices.getAll();

    return NextResponse.json(voices);
  } catch (error) {
    console.error('Error fetching voices:', error);
    return NextResponse.json({ error: 'Failed to fetch voices' }, { status: 500 });
  }
}