export const ProteinSelectionGroup = () => {
  return (
    <>
      <form>
        <label htmlFor="protein-1">
          <input
            id="protein-1"
            type="radio"
            name="protein"
            value="1"
            checked={true}
          />
          Nötkött
        </label>
        <br />
        <label htmlFor="protein-2">
          <input id="protein-2" type="radio" name="protein" value="2" />
          Kyckling
        </label>
        <br />
        <label htmlFor="protein-3">
          <input id="protein-3" type="radio" name="protein" value="3" />
          Fläsk
        </label>
      </form>
    </>
  );
};
