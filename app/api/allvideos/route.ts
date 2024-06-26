import { NextRequest } from "next/server"


const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function GET(req: NextRequest) {
    const authorization = req.headers.get('Authorization') as string;
    const { searchParams } = new URL(req.url);
    const page = searchParams.get('page');
    const page_size = searchParams.get('page_size');

    try {
        const response = await fetch(`${baseUrl}/api/v1/videos/?page=${page}&page_size=${page_size}`, {
            cache: 'no-cache',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: authorization
            },
        })

        if (response.ok) {
            const responseData = await response.json();

            return new Response(JSON.stringify(responseData))
        }
        else {
            const errorData = await response.json();

            return new Response(JSON.stringify(errorData));
        }
    } catch (error) {
        return new Response('Something went wrong, please try again')
    }
}