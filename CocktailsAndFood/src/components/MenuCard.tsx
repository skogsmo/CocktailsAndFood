export const MenuCard = () => {
  return (
    <>
      <div className="flex">
        <div className="">
          <img
            src="/images/chipotle-mexican-bowl.jpeg"
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col justify-center mx-4">
          <p className="font-bold my-2">Chipotle Mexican Bowl</p>
          <p className="font-medium my-2">125 kr</p>
          <p className="my-2">
            Mexikanskt ris/ romansallad, ditt val av protein, raw slaw,
            majssalsa, frökrisp, nachos, koriander, pico de gallo &
            chipotlecréme
          </p>
          <button className="my-2 text-black bg-yellow-400">Välj</button>
        </div>
      </div>
    </>
  );
};
