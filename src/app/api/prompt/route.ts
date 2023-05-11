import Prompt from "@models/prompt"
import { connectToDB } from "@utils/database"


export const GET = async (req: Request, res: Response) => {    

    try {
        await connectToDB()
        const prompts = await Prompt.find({}).populate('creator');

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        console.log('====================================');
        console.log('Error: ', error);
        console.log('====================================');
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}