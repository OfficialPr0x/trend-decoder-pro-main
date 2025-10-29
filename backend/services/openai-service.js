import OpenAI from 'openai';

export class OpenAIService {
  constructor(apiKey) {
    this.client = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: apiKey,
      defaultHeaders: {
        'HTTP-Referer': 'http://localhost:3001',
        'X-Title': 'VIRALIFY - TikTok Viral Analyzer',
      },
    });
  }

  async chatCompletion(messages, options = {}) {
    try {
      const completion = await this.client.chat.completions.create({
        model: options.model || 'anthropic/claude-3-5-sonnet',
        messages: messages,
        stream: options.stream || false,
        temperature: options.temperature || 0.7,
        max_tokens: options.maxTokens || 4000,
      });

      return completion;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw new Error(`OpenAI API Error: ${error.message}`);
    }
  }

  async streamChatCompletion(messages, onChunk, options = {}) {
    try {
      const stream = await this.client.chat.completions.create({
        model: options.model || 'anthropic/claude-3-5-sonnet',
        messages: messages,
        stream: true,
        temperature: options.temperature || 0.7,
        max_tokens: options.maxTokens || 4000,
      });

      for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta;
        if (delta?.content) {
          onChunk(delta.content);
        }
      }
    } catch (error) {
      console.error('OpenAI Streaming Error:', error);
      throw new Error(`OpenAI Streaming Error: ${error.message}`);
    }
  }

  async generateImage(prompt, options = {}) {
    try {
      const image = await this.client.images.generate({
        model: options.model || 'dall-e-3',
        prompt: prompt,
        size: options.size || '1024x1024',
        quality: options.quality || 'standard',
        n: 1,
      });

      return {
        url: image.data[0].url,
        prompt: prompt,
        model: options.model || 'dall-e-3',
        revisedPrompt: image.data[0].revised_prompt,
      };
    } catch (error) {
      console.error('OpenAI Image Generation Error:', error);
      throw new Error(`Image Generation Error: ${error.message}`);
    }
  }
}
