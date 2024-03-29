
import Prompt from "@models/prompt"
import { connectToDB } from "@utils/database"

interface MyCustomParams {
    id: string | number;
    // Outros parâmetros que você está esperando
}

// GET
export const GET = async (req: Request, { params }: { params: MyCustomParams }) => {

    try {
        await connectToDB()
        const prompt = await Prompt.findById(params.id).populate('creator');

        if (!prompt) return new Response("Prompt not found!", { status: 404 })

        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (error) {
        console.log('====================================');
        console.log('Error: ', error);
        console.log('====================================');
        return new Response("Failed to fetch a prompt", { status: 500 })
    }
}

// PATCH
export const PATCH = async (req: Request, { params }: { params: MyCustomParams }) => {
    const { prompt, tag } = await req.json()

    try {
        await connectToDB()

        const existingPrompt = await Prompt.findById(params.id)

        if (!existingPrompt) return new Response("Prompt not found!", { status: 404 })

        existingPrompt.prompt = prompt
        existingPrompt.tag = tag

        await existingPrompt.save()

        return new Response(JSON.stringify(existingPrompt), { status: 200 })
    } catch (error) {
        console.log(error);
        return new Response("Failed to update prompt", { status: 500 })
    }
}

// DELETE
export const DELETE = async (req: Request, { params }: { params: MyCustomParams }) => {
    try {
        await connectToDB()
        await Prompt.findByIdAndRemove(params.id)

        return new Response("Prompt delete successfully", { status: 200 })
    } catch (error) {
        console.log(error);
        return new Response("Failed to delete prompt", { status: 500 })
    }
}