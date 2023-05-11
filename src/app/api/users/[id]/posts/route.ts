import Prompt from "@models/prompt"
import { connectToDB } from "@utils/database"
import { NextApiRequest, NextApiResponse } from 'next';

interface MyCustomParams {
    id: string | number;
    // Outros parâmetros que você está esperando
  }

export const GET = async (req: NextApiRequest, { params }: { params: MyCustomParams }) => {    

    try {
        await connectToDB()
        const prompts = await Prompt.find({creator: params.id}).populate('creator');

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        console.log('====================================');
        console.log('Error: ', error);
        console.log('====================================');
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}