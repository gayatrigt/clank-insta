// src/services/art.ts
import { put } from '@vercel/blob';
import Together from 'together-ai';

export const together = new Together({
    apiKey: process.env.TOGETHER_API_KEY
});

export interface ImageGenerationResult {
    imageUrl: string;
    prompt: string;
}

export async function generateImage(prompt: string): Promise<ImageGenerationResult> {
    try {
        const response = await together.images.create({
            model: "black-forest-labs/FLUX.1-schnell",
            prompt,
            width: 1024,
            height: 768,
            steps: 1,
            n: 1,
        });
        console.log("🚀 ~ generateImage ~ response:", response);

        const imageUrl = (response.data[0] as any)?.url;
        if (!imageUrl) {
            throw new Error('No image URL received from Together AI');
        }

        const imageResponse = await fetch(imageUrl);
        if (!imageResponse.ok) {
            throw new Error('Failed to fetch image from URL');
        }

        const imageBuffer = await imageResponse.arrayBuffer();
        const blob = await put(
            `generated-art-${Date.now()}.png`,
            Buffer.from(imageBuffer),
            { access: 'public' }
        );

        return {
            imageUrl: blob.url,
            prompt
        };
    } catch (error) {
        console.error('Error generating image:', error);
        throw error;
    }
}