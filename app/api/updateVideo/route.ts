import { NextRequest } from "next/server"


const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function PUT(req: NextRequest) {
    const authorization = req.headers.get('Authorization') as string;
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    const data = await req.json();

    try {
        const response = await fetch(`${baseUrl}/api/v1/videos/${id}/`, {
            cache: 'no-cache',
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: authorization
            },
            body: JSON.stringify({
                title: data.title,
                description: data.description,
            })
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