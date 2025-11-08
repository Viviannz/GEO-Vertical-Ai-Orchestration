import Anthropic from '@anthropic-ai/sdk';
import { AgentName, AgentResponse } from '@/types';
import { SYSTEM_PROMPT, getAgentPrompt } from './prompts';

export async function callAgent(
  apiKey: string,
  agent: AgentName,
  userInput: string,
  previousResponses?: AgentResponse[]
): Promise<AgentResponse> {
  const anthropic = new Anthropic({
    apiKey,
    dangerouslyAllowBrowser: true, // For client-side usage
  });

  // Build context from previous agents
  const contextText = previousResponses?.map(r =>
    `### ${r.agent.toUpperCase()} Response:\n${r.response}`
  ).join('\n\n');

  const agentPrompt = getAgentPrompt(agent, contextText);

  const startTime = Date.now();

  try {
    const message = await anthropic.messages.create({
      model: 'claude-3-5-haiku-20241022', // Using Haiku for cost efficiency
      max_tokens: 2000,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: agentPrompt + '\n\n---\n\nUser Input:\n' + userInput,
        },
      ],
    });

    const responseText = message.content[0].type === 'text'
      ? message.content[0].text
      : '';

    // Calculate tokens and cost
    const tokensUsed = message.usage.input_tokens + message.usage.output_tokens;
    const estimatedCost = calculateCost(
      message.usage.input_tokens,
      message.usage.output_tokens
    );

    return {
      agent,
      response: responseText,
      timestamp: new Date(),
      tokensUsed,
      estimatedCost,
    };
  } catch (error: any) {
    throw new Error(`Agent ${agent} failed: ${error.message}`);
  }
}

export async function validateApiKey(apiKey: string): Promise<boolean> {
  try {
    const anthropic = new Anthropic({
      apiKey,
      dangerouslyAllowBrowser: true,
    });

    // Simple test call
    await anthropic.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 10,
      messages: [
        {
          role: 'user',
          content: 'test',
        },
      ],
    });

    return true;
  } catch {
    return false;
  }
}

function calculateCost(inputTokens: number, outputTokens: number): number {
  // Haiku pricing (as of 2024): $0.25 per M input, $1.25 per M output
  const inputCost = (inputTokens / 1000000) * 0.25;
  const outputCost = (outputTokens / 1000000) * 1.25;
  return inputCost + outputCost;
}
