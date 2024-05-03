import { useEffect, useState } from "react";
import { AboutUsCard } from "../components/AbouUsCard";
import StandardButton from "../components/StandardButton";
import BigWhiteBox from "../layout_components/BigWhiteBox";
import BigWhiteBoxSection from "../layout_components/BigWhiteBoxSection";
import StandardHeader from "../layout_components/StandardHeader";
import getTailwindColumnsNoSingleItem from "../utils/getTailwindColumnsNoSingleItem";
import { twMerge } from "tailwind-merge";

export interface TeamMemberInfo {
    name: string;
    title: string;
    description: string;
    imageUrl: string;
}

export const AboutUs = () => {
    const [teamMembers, setTeamMembers] = useState<
        TeamMemberInfo[] | undefined
    >(undefined);

    useEffect(() => {
        (async () => {
            const res = await fetch("data/about.json");
            const json: TeamMemberInfo[] = await res.json();
            setTeamMembers(json);
        })();
    }, []);

    return (
        <>
            {teamMembers && (
                <>
                    <StandardHeader
                        head={"Nuestro Equipo"}
                    />
                    <div className="flex flex-col gap-8 mb-8">
                        <div className="w-full flex justify-center">
                            <ul
                                className={twMerge(
                                    "gap-8 justify-start grid",
                                    getTailwindColumnsNoSingleItem(teamMembers.length, 3)
                                )}>
                                {teamMembers.sort((a, b) => a.name.localeCompare(b.name)).map((person) => (
                                    <li key={person.name}>
                                        <AboutUsCard
                                            name={person.name}
                                            title={person.title}
                                            description={person.description}
                                            imageUrl={person.imageUrl}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <BigWhiteBox>
                        <BigWhiteBoxSection>
                            <div className="flex justify-center">
                                <StandardButton to="/" backArrow>
                                    Tillbaka
                                </StandardButton>
                            </div>
                        </BigWhiteBoxSection>
                    </BigWhiteBox>
                </>
            )}
        </>
    );
};
