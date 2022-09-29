import * as React from "react";
import { TConvertTypes } from "../../@types/converter";
import { ConverterWorkspace } from "./converterWorkspace";
import { ConverterHeader } from "./converterHeader";

export const Converter: React.FC = () => {
  const [type, setType] = React.useState<TConvertTypes>("standard");
  const handleType = (type: TConvertTypes) => setType(type);

  return (
    <div className="converter">
      <ConverterHeader handleType={handleType} type={type} />
      <ConverterWorkspace type={type} handleType={handleType} />
    </div>
  );
};
