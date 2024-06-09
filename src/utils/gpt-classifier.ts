import { GoogleGenerativeAI } from "@google/generative-ai";
import { CATEGORIZED_EMAILS, EMAIL } from "@/app/type";

let savedApiKey: any;

if (typeof window !== 'undefined') {
  savedApiKey = localStorage.getItem('GEMINI_KEY');
}

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = savedApiKey ?? process.env.NEXT_PUBLIC_GEMINI_KEY ?? "";

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

const generationConfig = {
  temperature: 0.9,
  topK: 1,
  topP: 1,
  maxOutputTokens: 1, // Adjust tokens based on the required response
};

async function classifyEmails(emails: EMAIL[]): Promise<CATEGORIZED_EMAILS> {
  const categorizedEmails: CATEGORIZED_EMAILS = [];

  await Promise.all(
    emails.map(async (email: EMAIL) => {
      const prompt = `
        Judging from the subject line and the body of this email, classify this email:
        Subject: ${email.subject}
        Body: ${email.body}
        Give the answer labeled as:
        - "important": Emails that are personal or work-related and require immediate attention.
        - "promotion": Emails related to sales, discounts, and marketing campaigns.
        - "social": Emails from social networks, friends, and family.
        - "marketing": Emails related to marketing, newsletters, and notifications.
        - "spam": Unwanted or unsolicited emails.
        - "general": If none of the above are matched, use General.
        Give one word (important, promotion, social, marketing, spam, or general) answer from these options only and ignore the dash lines in the body.
      `;

      const chat = model.startChat({
        generationConfig,
        history: [],
      });

      const result = await chat.sendMessage(prompt);
      const responseText = result.response.text();

      const decision = responseText.trim();

      console.log(decision);

      categorizedEmails.push({ subject: email.subject, from: email.from, classification: decision || "", body: email.body });
    })
  );

  return categorizedEmails;
}

export default classifyEmails;
