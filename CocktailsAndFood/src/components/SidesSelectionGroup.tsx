export const SidesSelectionGroup = () => {
  return (
    <>
      <form>
        <label htmlFor="sides-1">
          <input id="sides-1" type="checkbox" name="sides" value="Guacamole" />
          Guacamole
        </label>
        <label htmlFor="sides-2">
          <input id="sides-2" type="checkbox" name="sides" value="Salsa Roja" />
          Salsa Roja
        </label>
        <label htmlFor="sides-3">
          <input id="sides-3" type="checkbox" name="sides" value="Tortilla" />
          Tortilla
        </label>
      </form>
    </>
  );
};
