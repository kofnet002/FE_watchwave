import { NextRequest } from "next/server"


const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function GET(req: NextRequest) {
    console.log('1');

    const authorization = req.headers.get('Authorization') as string;
    console.log('2');

    try {
        console.log('3');
        const response = await fetch(`${baseUrl}/api/v1/auth/users/me/`, {
            cache: 'no-cache',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: authorization
            },
        })
        console.log('4');

        if (response.ok) {
            const responseData = await response.json();
            console.log('rs', responseData);

            return new Response(JSON.stringify(responseData))
        }
        else {
            const errorData = await response.json();
            console.log('ed', errorData);

            return new Response(JSON.stringify(errorData));
        }
    } catch (error) {
        return new Response('Something went wrong, please try again')
    }
}