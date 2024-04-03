import ButtonToMenuPage from "./ButtonToMenuPage";

export const Welcome = () => {
  return (
    <>
      <div className="min-h-screen min-w-screen relative">
        <div className="absolute text-white bg-black/70 w-full h-full flex flex-col items-center">
          <h2 className="px-4 mb-3 mt-48 text-xs sm:text-3xl md:text-4xl font-ultra">
            VÄLKOMMEN TILL
          </h2>
          <h1 className="px-4 mx-10 text-xl sm:text-5xl md:text-6xl font-ultra">
            Bowls & cocktails
          </h1>
          <p className="px-4 w-2/5 my-5 text-base font-montserrat font-medium text-center">
            Upplev smakrika burrito bowls och uppfriskande cocktails hos oss.
            Skapa din perfekta kombination av smaker och låt oss guida dig på en
            kulinarisk resa. <br /> <br /> Vi erbjuder enastående
            matupplevelser, kombinerat med unika cocktailrekommendationer, som
            kompletterar din måltid perfekt.
          </p>
        <ButtonToMenuPage/>
        </div>

        <img
          className="h-full w-full min-h-screen min-w-screen object-cover"
          src="/images/Bakgrund.jpeg"
          alt="/"
        />
      </div>
    </>
  );
};
