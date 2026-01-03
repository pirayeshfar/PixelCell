
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Analyzes the image using Gemini and returns a brief artistic summary
 */
export const analyzeImage = async (base64Image: string): Promise<string> => {
  try {
    // Extract base64 content from data URL
    const imageData = base64Image.split(',')[1];
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          parts: [
            {
              inlineData: {
                data: imageData,
                mimeType: 'image/jpeg',
              },
            },
            {
              text: "Provide a one-sentence artistic summary of this image's color palette and overall mood. Keep it under 20 words.",
            },
          ],
        },
      ],
      config: {
        temperature: 0.7,
      },
    });

    return response.text?.trim() || "A fascinating composition of colors.";
  } catch (error) {
    console.error("Gemini analysis failed:", error);
    return "The beauty of this image is beyond simple analysis.";
  }
};
