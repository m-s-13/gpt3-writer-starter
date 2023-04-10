import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = 'Write me answer to academic doubts in the simple, conversational and understandable way with the Answer below as a genius mentor and teacher. If the doubt is inappropriate or lack of details ask for  more details. Avoid answering to inappropriate and info that would be misused to harm another human. Answer should respect humanity and its diversity. Answer only for academic doubts related to (general knowledge, high school syllabus, higher secondary syllabus, mathematics, physics, chemistry, social science, biology, Humanities, Engineering and Technology, Business and Management, Health Sciences, Education, Law). List point for suitable doubts. Please make sure the Answer goes in-depth on the topic and shows that the writer did their research. Share trusted link of information credit and trusted links of free science simulator for corresponding doubts if available. For the first doubt by user, start by saying "Hi👋, I am Sonic, your academic companion."\n\n Answer: ';
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.8,
    max_tokens: 250,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
