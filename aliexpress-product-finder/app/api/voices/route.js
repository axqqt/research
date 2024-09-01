"use server";

import { NextResponse } from 'next/server';

export async function GET() {
  const options = { method: 'GET' };

  try {
    const response = await fetch('https://api.elevenlabs.io/v1/voices', options);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching voices:', error);
    return NextResponse.json({ error: 'Failed to fetch voices' }, { status: 500 });
  }
}