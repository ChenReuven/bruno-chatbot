
export const getLatestMessages = async (threadID: string, runID: string) => {
    let run = await client.beta.threads.runs.retrieve(threadID, runID);
    
    while(run?.status != "completed") {
        await new Promise(resolve => setTimeout(resolve, 500)); // wait 500ms and continue
        run = await client.beta.threads.runs.retrieve(threadID, runID);
    }
    const messages = await client.beta.threads.messages.list(threadID);
    return messages;
}