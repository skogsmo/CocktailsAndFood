import { MenuCard } from "../components/MenuCard";

export const Menu = () => {
  return (
    <>
      <h1 className="text-center text-6xl font-ultra my-5">
        VÅRA BURRITO BOWLS
      </h1>
      <p className="text-center font-ultra">
        Välj en bowl med ris eller sallad, grönsaker, protein och dessing/salsa.
      </p>
      <p className="text-center font-ultra">
        Du anpassar din beställning i nästa steg.
      </p>
      <div className="flex my-10">
        <MenuCard />
        <MenuCard />
        <MenuCard />
      </div>
    </>
  );
};
