import {FrameRequest, getFrameMessage, getFrameHtmlResponse} from '@coinbase/onchainkit';
import {NextRequest, NextResponse} from "next/server";
import {NEXT_PUBLIC_URL} from '../config';
import {getRandomTrack} from '../utils/spinamp';

import {fetchTrackBySlug, fetchPlaylistById, ITrack} from "@spinamp/spinamp-sdk";


async function getResponse(req: NextRequest): Promise<NextResponse> {
    let text: string | undefined = '';

    const body: FrameRequest = await req.json();

    const res = await getRandomTrack()
    console.log(res)
    const trackUrl: string = res.websiteUrl
    const trackArtwork: string = res.lossyArtworkUrl
    const trackTitle: string = res.title

    return new NextResponse(
        getFrameHtmlResponse({
            buttons: [
                {
                    action: 'post',
                    label: 'Discover 🎶',
                },
                {
                    action: 'link',
                    label: 'Get Track 🎧 ',
                    target: trackUrl,
                },
            ],
            image: {
                src: trackArtwork,
            },
            postUrl: `${NEXT_PUBLIC_URL}/frames`,
        }),
    );
}

export async function POST(req: NextRequest): Promise<Response> {
    return getResponse(req);
}

export const dynamic = 'force-dynamic';

