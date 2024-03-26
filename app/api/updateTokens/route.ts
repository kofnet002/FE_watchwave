import { NextApiResponse } from "next";
import { NextRequest } from "next/server"

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function POST(req: NextRequest, res: NextApiResponse) {
    const accessToken = req.cookies.get('access-token')?.value;

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const formData = await req.json();

    try {
        const response = await fetch(`${baseUrl}/auth/jwt/refresh/`, {
            cache: 'no-cache',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                refresh: formData.refresh
            })
        })

        if (response.ok) {
            const responseData = await response.json();
            return new Response(JSON.stringify(responseData))
        } else {
            const errorData = await response.json();
            return new Response(JSON.stringify(errorData));
        }
    } catch (error) {
        return new Response('Something went wrong, please try again')
    }
}