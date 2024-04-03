import ButtonToMenuPage from "../components/ButtonToMenuPage"
import { Welcome } from "../components/Welcome";
import React from "react"

const Start: React.FC = () => {
    return (
        <>
        <div>
        <Welcome/>

        <ButtonToMenuPage/>
        </div>
        </>


 )
}

export default Start;