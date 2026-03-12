import fs from "fs";
import path from "path";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

// OpenAI Client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function testGenAI() {
  try {
    const projectPath = path.join(
      process.cwd(),
      "../database/raw/project.json"
    );

    const promptPath = path.join(
      process.cwd(),
      "../genai/llm_integration/prompt.md"
    );

    const projectData = JSON.parse(fs.readFileSync(projectPath, "utf-8"));
    const promptTemplate = fs.readFileSync(promptPath, "utf-8");

    const project = projectData[0];

    const finalPrompt =
      promptTemplate + "\nProject Input:\n" + JSON.stringify(project);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: finalPrompt }],
      max_tokens: 500,
    });

    console.log(response.choices[0].message.content);

  } catch (error) {
    console.error(error.message);
  }
}

testGenAI();