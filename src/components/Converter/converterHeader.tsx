import React from "react";
import { converterTypeConfig } from "./converterTypeConfig";
import { TConvertTypes } from "../../@types/converter";
import cn from "classnames";

export const ConverterHeader: React.FC<{
  handleType: (type: TConvertTypes) => void;
  type: TConvertTypes;
}> = ({ handleType, type: activeType }) => {
  return (
    <div className="converter-header">
      {Object.keys(converterTypeConfig).map((type: TConvertTypes) => {
        if (!converterTypeConfig[type]) return;

        return (
          <button
            className={cn(activeType === type && "active")}
            onClick={() => handleType(type)}
            key={type}
            name={type}
          >
            {converterTypeConfig[type]}
          </button>
        );
      })}
    </div>
  );
};
