import StandardLinkButton from "../components/StandardLinkButton";

export const Welcome = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-[url('/img/Bakgrund.jpeg')] bg-cover bg-repeat">
        <img
          src="/img/lottas-finest.svg"
          alt="bowls and cocktails logo"
          className="absolute size-32 top-10 left-10 hidden sm:flex"
        />
        <div className="bg-black/70 grow flex flex-col justify-center items-center">
          <div className="text-white flex flex-col items-center text-center max-w-[1000px]">
            <h2 className="px-4 mb-3">VÄLKOMMEN TILL</h2>
            <h1 className="px-4 mb-[35px]">BOWLS & COCKTAILS</h1>
            <p className="px-4 text-lg sm:text-xl mb-[50px]">
              Upplev smakrika burrito bowls och uppfriskande cocktails hos oss.
              Skapa din perfekta kombination av smaker och låt oss guida dig på
              en kulinarisk resa.
              <br /> <br />
              Vår restaurang erbjuder enastående matupplevelser, kombinerat med
              unika cocktailrekommendationer, som kompletterar din måltid
              perfekt.
            </p>
            <div className="text-neutral-900 flex">
              <StandardLinkButton to="/menu" yellow>
                Utforska vår meny
              </StandardLinkButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
