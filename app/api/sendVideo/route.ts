import { NextRequest } from "next/server"


const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function POST(req: NextRequest) {
    const formData = await req.formData()

    const authorization = req.headers.get('Authorization') as string;

    try {
        const response = await fetch(`${baseUrl}/api/v1/videos/`, {
            cache: 'no-cache',
            method: 'POST',
            headers: {
                // 'Content-Type': 'application/json'
                Authorization: authorization
            },
            body: formData
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