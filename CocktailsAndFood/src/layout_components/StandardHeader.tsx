export default function StandardHeader({
    head,
    subHead,
    subHeads,
}: {
    head: string;
    subHead?: string;
    subHeads?: string[];
}) {
    subHeads = [subHead || "", ...(subHeads || [])].filter((s) => s.length > 0);

    return (
        <div className="w-full mb-[50px]">
            <div className="px-8 text-center flex flex-col gap-5 -my-1">
                <h2>{head}</h2>
                {subHeads.length > 0 && (
                    <div className="flex flex-col text-lg font-medium">
                        {subHeads.map((subHead, index) => (
                            <p key={index}>{subHead}</p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
