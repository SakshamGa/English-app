
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export interface CorrectionResponse {
  reply: string;
  improved?: string;
  explanation?: string;
  score: number;
}

export const getTutorResponse = async (message: string, history: {role: string, content: string}[]): Promise<CorrectionResponse> => {
  const model = ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      ...history.map(h => ({ role: h.role === 'assistant' ? 'model' as const : 'user' as const, parts: [{ text: h.content }] })),
      { role: "user", parts: [{ text: message }] }
    ],
    config: {
      systemInstruction: `You are Lovable, a professional and friendly English Tutor. 
      Your goal is to help users practice English. 
      For every user message:
      1. Reply naturally to their message.
      2. Analyze their English for grammar and flow.
      3. Provide a 'score' from 1-100 for their sentence structure.
      4. If there are mistakes, provide an 'improved' version of their sentence and a clear 'explanation' in simple English. 
      If helpful, you can include a brief Hindi explanation for complex concepts.
      Return the output strictly in JSON format.`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          reply: { type: Type.STRING, description: "Your conversational response to the user." },
          improved: { type: Type.STRING, description: "The corrected/improved version of the user's input." },
          explanation: { type: Type.STRING, description: "Simple explanation of why changes were made." },
          score: { type: Type.NUMBER, description: "Accuracy score out of 100." }
        },
        required: ["reply", "score"]
      }
    }
  });

  const response = await model;
  try {
    return JSON.parse(response.text || '{}') as CorrectionResponse;
  } catch (error) {
    console.error("Failed to parse Gemini response", error);
    return { reply: "I'm sorry, I'm having trouble processing that right now. Could you say it again?", score: 100 };
  }
};
