import {
    FrameButton,
    FrameContainer,
    FrameImage,
    NextServerPageProps,
    getPreviousFrame,
    getFrameMessage,
} from "frames.js/next/server";
import {NEXT_PUBLIC_URL} from './config';

export default async function Home({
                                       params,
                                       searchParams,
                                   }: NextServerPageProps) {
    const previousFrame = getPreviousFrame<null>(searchParams);

    const frameMessage = await getFrameMessage(previousFrame.postBody);

    if (frameMessage && !frameMessage?.isValid) {
        throw new Error("Invalid frame payload");
    }

    return (
        <div className="p-4">
            <FrameContainer
                postUrl="/frames"
                previousFrame={previousFrame}
                pathname={'.'}
                state={null}>
                <FrameImage>
                    <div tw="w-full h-full bg-slate-700 text-slate-400 text-6xl justify-center items-center">
                        🎧 Discover WLTA 🎧
                    </div>
                </FrameImage>
                <FrameButton action="post" target={`${NEXT_PUBLIC_URL}/frames`}>
                    🎶 Discover Track 🎶
                </FrameButton>
            </FrameContainer>
        </div>
    );
}
