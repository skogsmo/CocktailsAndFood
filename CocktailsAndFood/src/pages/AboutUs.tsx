import { AboutUsCard } from "../components/AbouUsCard"
import StandardHeader from "../layout_components/StandardHeader"

export interface AboutUsInfo {
    name: string;
    title: string;
    description: string;
    imageUrl: string;
}

const AboutUsArray: AboutUsInfo[] = [
    {name: "Alexander", title: "developer", description: "hello", imageUrl: "img/alexander.png"},
    {name: "Dan", title: "developer", description: "hello", imageUrl: "img/dan.png"},
    {name: "Lotta", title: "developer", description: "hello", imageUrl: "img/lotta.png"},
    {name: "Niclas", title: "developer", description: "hello", imageUrl: "img/image"},
    {name: "Benjamin",title: "developer", description: "hello", imageUrl: "img/benjamin.jpg"},
    {name: "Linnea", title: "developer", description: "hello", imageUrl: "img/linnea.png"},
    {name: "Claes", title: "developer", description: "hello", imageUrl: "img/claes-ese.png"},
]

export const AboutUs = () => {
    return (
        <>
            <StandardHeader head={"Våra utvecklare"}
                subHeads={[
                "Välj en bowl med ris eller sallad, grönsaker, protein och dressing/salsa.",
                "Du anpassar din beställning i nästa steg.",
            ]}/>

            <div className="flex flex-col gap-8">
                <div className="w-full flex justify-center">
                    {/* <ul className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-8">  */}
                    <ul className="grid grid-cols-4 gap-8">
                        {AboutUsArray.map((person) => (
                            <li key={person.name}>
                                <AboutUsCard name={person.name} title={person.title} description={person.description} imageUrl={person.imageUrl}/>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}