import React, { useEffect } from "react";

export function RadiobuttonSelector<T, U>({
  options,
  propertyName,
  idProperty,
  titleProperty,
  updateAction,
  object,
  renderLabel: renderLabelText,
}: {
  options: U[];
  propertyName: keyof T;
  idProperty: keyof U;
  titleProperty: keyof U;
  updateAction: (updatedObject: T) => void;
  object: T;
  renderLabel: (option: U) => React.ReactNode;
}) {
  const property = object[propertyName] as U;

  useEffect(() => {
    if (!property) {
      const modifiedObject: T = { ...object, [propertyName]: options[0] };
      updateAction(modifiedObject);
    }
  }, [object]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const chosenOption = options.find(
      (option) => option[idProperty] === +e.target.value
    );
    const modifiedObject: T = { ...object, [propertyName]: chosenOption };
    updateAction(modifiedObject);
  };

  const mapped = options.map((option) => {
    return (
      <div key={`${String(propertyName)}-${option[idProperty]}`}>
        <input
          id={`${String(propertyName)}-${option[idProperty]}`}
          type="radio"
          name={String(options[0][titleProperty])}
          value={Number(option[idProperty])}
          checked={property?.[idProperty] === option[idProperty]}
          onChange={(e) => handleOnChange(e)}
        />
        <label htmlFor={`${String(propertyName)}-${option[idProperty]}`}>
          {renderLabelText(option)}
        </label>
      </div>
    );
  });

  return <>{mapped}</>;
}
