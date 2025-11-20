import { GoogleGenAI } from "@google/genai";
import { PromptFormData } from "../types";
import { TECHNICAL_SUFFIX, STYLE_DESCRIPTIONS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateMagicPrompt = async (formData: PromptFormData): Promise<string> => {
  const { storyIdea, style, camera, mood } = formData;

  // We use the specific style description mapped from the selection to give the model better context
  const specificStyleDesc = STYLE_DESCRIPTIONS[style];

  const systemInstruction = `You are an expert prompt engineer for high-end AI video generation (specifically Google Veo). 
  Your task is to take a simple story idea and technical parameters, and weave them into a single, cohesive, descriptive paragraph.
  
  Guidelines:
  1. Focus on visual details: colors, textures, and action.
  2. Incorporate the 'Visual Style', 'Camera Movement', and 'Lighting' naturally into the description.
  3. Keep the tone magical, high-quality, and suitable for the requested style (e.g., cute for Disney, tactile for Claymation).
  4. Do NOT add technical quality tags (like 4k, unreal engine) in your output text; these will be appended programmatically later.
  5. The output should be one or two solid sentences describing the scene.`;

  const userPrompt = `
    Story Idea: "${storyIdea}"
    Visual Style: ${style} (${specificStyleDesc})
    Camera Movement: ${camera}
    Lighting/Mood: ${mood}
    
    Write the visual description part of the prompt.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7, 
      }
    });

    const refinedDescription = response.text ? response.text.trim() : storyIdea;
    
    // Programmatically append the mandatory technical keywords
    return `${refinedDescription}, ${TECHNICAL_SUFFIX}`;
    
  } catch (error) {
    console.error("Error generating prompt:", error);
    // Fallback if API fails: Basic concatenation
    return `${storyIdea}, ${style}, ${camera}, ${mood}, ${TECHNICAL_SUFFIX}`;
  }
};