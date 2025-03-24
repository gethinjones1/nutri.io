// server.ts
import express, { Request, Response } from 'express';
import axios from 'axios';
import { config } from 'dotenv';
import cors from 'cors';

config(); // Loads variables from .env

const app = express();
app.use(express.json());
app.use(cors()); // Enable if you plan to call this from a mobile app

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const PORT = process.env.PORT || 3000;

interface Plan {
    structuredActivities: StructuredActivity[];
    nonStructuredActivities: NonStructuredActivity[];
}

interface StructuredActivity {
    type: string;
    exercises: {
        name: string;
        sets: number;
        reps: number;
    }[];
}

interface NonStructuredActivity {
    type: string;
    description: string;
    frequency?: string;
}

// Endpoint to generate a plan from the user's goal
app.post('/generate-plan', async (req: Request, res: Response) => {
    const { goal } = req.body;
    if (!goal) {
        return res.status(400).json({ error: 'Goal is required' });
    }

    try {
        // Build a prompt instructing GPT to return a valid JSON structure.
        const prompt = buildPrompt(goal);

        const response = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                model: 'text-davinci-003', // or 'gpt-4' if available
                prompt,
                max_tokens: 500,
                temperature: 0.7,
                stop: null
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${OPENAI_API_KEY}`
                }
            }
        );

        // Assuming GPT returns JSON in its response text.
        const planText = response.data.choices[0].text.trim();

        // Parse the GPT output into our plan interface
        const plan: Plan = JSON.parse(planText);

        // At this point you can store `plan` into your database.
        // For now, we'll just return the plan as the response.
        res.json(plan);
    } catch (error) {
        console.error('Error generating plan:', error);
        res.status(500).json({ error: 'An error occurred while generating the plan.' });
    }
});

function buildPrompt(goal: string): string {
    return `
    You are a life coach and fitness expert.
    The user's goal is: "${goal}".
    Create a plan that includes two sections: 
    "structuredActivities" and "nonStructuredActivities".
    
    For structuredActivities:
    - Provide a "type" (e.g., "gym").
    - Provide an "exercises" array with objects that include "name", "sets", and "reps".

    For nonStructuredActivities:
    - Provide a "type" (e.g., "reading", "programming").
    - Provide a "description" of the task and optionally a "frequency" (e.g., "daily").

    Format your response as valid JSON only. Do not include any additional text.
  `;
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
