import { anthropic } from './anthropic';

export async function parseCaption(text: string): Promise<{ title: string; symbol: string; }> {
    // Define the prompt for the Anthropic model
    try {
        // Make a request to the Anthropic API using the SDK
        const msg = await anthropic.messages.create({
            model: "claude-3-7-sonnet-20250219",
            max_tokens: 1024,
            messages: [
                {
                    role: "user",
                    // content: `Given the text: "${text}", check if there is a command to deploy a token. If yes, extract the title and symbol. If not, return "No command found". Dont give me any intro or out, just what I asked. The symbol should be all captial and starts with $.`
                    content: `Given the text: "${text}", give me A title and symbol for a token related to this. If not, return "No command found". Dont give me any intro or out, just what I asked. The symbol should be all captial and starts with $.
                    Example Response: {"title":"MyToken", "symbol":"$MTK"}
                    `
                },
            ],
        });
        // Parse the response from the Anthropic API
        const result = msg.content[0]?.type === 'text' ? msg.content[0]?.text.trim() : '';
        console.log("🚀 ~ parseCaption ~ result:", result);

        // Check if the result indicates a command was found
        if (result.includes('No command found')) {
            throw new Error('No command found');
        }

        let json: { title: string; symbol: string; };
        try {
            json = JSON.parse(result) as { title: string; symbol: string; };
        } catch (e) {
            throw new Error('Failed to parse JSON');
        }
        // Extract title and symbol from the result
        if (!json.title || !json.symbol) {
            throw new Error('No title and symbol found in the result');
        }
        const title = json.title;
        const symbol = json.symbol;

        if (!title || !symbol) {
            throw new Error('Title or symbol not found in the result');
        }

        return { title, symbol };
    } catch (error) {
        console.error('Error calling Anthropic API:', error);
        throw error;
    }
}

// Example usage:
// const text1 = "Please deploy token: MyToken MTK";
// const text2 = "This is just a regular text.";
