import StandardButton from "./StandardButton"

export const CancelPopup = ({submit, isPopupOpen, closePopup} : {isPopupOpen: boolean, submit: () => void, closePopup: () => void}) => {
    return (
        <>
                    {isPopupOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-lg z-10"></div>
                    )}
        
                    {isPopupOpen && (
                        <div
                            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-300 h-40 w-60 m-auto z-20 p-4 rounded-[25px] shadow-custom-big"
                        >
                            <p className="text-center">
                                Vill du avbryta beställningen?
                            </p>
        
                            <div className="flex flex-row justify-between mt-8 gap-x-2">
                                <StandardButton type="button" className="bg-white" onClick={closePopup}>
                                    Nej
                                </StandardButton>
                                <StandardButton type="button" yellow onClick={submit}>
                                    Ja
                                </StandardButton>
                            </div>
                        </div>
                    )}
        </>
    )
}