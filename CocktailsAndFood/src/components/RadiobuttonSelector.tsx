import React, { useEffect } from "react";

export function RadiobuttonSelector<T, U>({
  options,
  property,
  optionIdProperty,
  optionTitleProperty,
  updateAction,
  object,
  renderLabel,
  labelClasses,
  wrapperClasses = "flex gap-2",
}: {
  options: U[];
  property: keyof T;
  optionIdProperty: keyof U;
  optionTitleProperty: keyof U;
  updateAction: (updatedObject: T) => void;
  object: T;
  renderLabel: (option: U) => React.ReactNode;
  labelClasses?: string;
  wrapperClasses?: string;
}) {
  const propertyObject = object[property] as U;

  useEffect(() => {
    if (!propertyObject) {
      const modifiedObject: T = { ...object, [property]: options[0] };
      updateAction(modifiedObject);
    }
  }, [object, propertyObject, property, options, updateAction]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const chosenOption = options.find(
      (option) => option[optionIdProperty] === +e.target.value
    );
    const modifiedObject: T = { ...object, [property]: chosenOption };
    updateAction(modifiedObject);
  };

  const mapped = options.map((option) => {
    return (
      <div
        key={`${String(property)}-${option[optionIdProperty]}`}
        className={wrapperClasses}
      >
        <input
          id={`${String(property)}-${option[optionIdProperty]}`}
          type="radio"
          name={String(options[0][optionTitleProperty])}
          value={Number(option[optionIdProperty])}
          checked={propertyObject?.[optionIdProperty] === option[optionIdProperty]}
          onChange={(e) => handleOnChange(e)}
        />
        <label
          htmlFor={`${String(property)}-${option[optionIdProperty]}`}
          className={labelClasses}
        >
          {renderLabel(option)}
        </label>
      </div>
    );
  });

  return mapped;
}
