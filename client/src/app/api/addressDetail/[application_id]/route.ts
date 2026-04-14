import { NextResponse, NextRequest } from 'next/server';
import axios from "axios";


export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ application_id: string }> }
) {
    try {
        const { application_id } = await params;
        const body = await req.json();
        const { content } = body


        const response = await axios.post(
            `http://localhost:4001/applications/${application_id}/address-details`,
            { content },
            {
                withCredentials: true,
            }
        );

        const res = NextResponse.json(response.data, { status: 200 });
        return res

    } catch (error: any) {
        const status = error?.response?.status || 500;
        const message = error?.response?.data || error?.message || "Internal Server Error";

        return NextResponse.json(message, { status });

    }


}
