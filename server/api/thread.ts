import { client, assistantId } from '../utils/openai';
import { RuntimeConfig } from 'nuxt/schema';
export default defineEventHandler(async (event)=>{
    const queryParams = getQuery(event);
    const thread = await client.beta.threads.create();

    const run = await client.beta.threads.runs.create(thread.id, {
        assistant_id: assistantId,
        additional_instructions: `This customer name is ${queryParams.customerName}`,
    })
    return {
        thread: thread.id,
        run: run.id
    };
})