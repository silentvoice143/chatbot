const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
});

async function generateText(prompt) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });
  console.log(chatCompletion.choices[0].message.content);
  const text = chatCompletion.choices[0].message.content;
  return text;
}

module.exports = generateText;
