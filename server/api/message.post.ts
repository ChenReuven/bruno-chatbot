import { getLatestMessages } from '../utils/get-message';
import {assistantId, client} from '../utils/openai';

export default defineEventHandler(async (event) => {
    const threadID = getCookie(event, "thread-id") as string;

    if (threadID) {
        return;
    }

    const queryParams = getQuery(event);

    await client.beta.threads.messages.create(threadID, {
        role: "user",
        content: queryParams?.message?.toString() ?? "",

    } as any)

    const run = await client.beta.threads.runs.create(threadID, {
       assistant_id: assistantId
    });

    return await getLatestMessages(threadID, run.id);

});