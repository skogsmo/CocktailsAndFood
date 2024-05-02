import { ReactNode } from "react";

export const SpicyChilis = ({ spiciness }: { spiciness: number }) => {
    const chiliImages: ReactNode[] = [];

    for (let i = 0; i < spiciness; i++) {
        chiliImages.push(<img key={i} src="/img/chili.png" className="size-5" />);
    }

    return (
        <div className="flex">
            {spiciness < 1 ? (
                <img src="/img/chili-gray.png" className="size-5" />
            ) : (
                chiliImages
            )}
        </div>
    );
};
