import * as React from "react";
import { useInput } from "../../hooks/useInput";
import { convert } from "../../utils/converter";
import { TConvertTypes } from "../../@types/converter";
import { Notify } from "../Notify";

export const Converter: React.FC = () => {
  const [type, setType] = React.useState<TConvertTypes>("standard");
  const { value, handleChange } = useInput();
  const { value: result, setValue: setValueResult } = useInput();

  const changeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (/<svg(\.*?)/gi.test(e.target.value) && type !== "svg") setType("svg");
    handleChange(e);
  };

  const handleConvert = React.useCallback(() => {
    const converted = convert(value, type);
    if (!converted) return;

    setValueResult(converted);
  }, [value]);

  return (
    <div className="converter">
      <textarea value={value} onChange={changeTextArea} />
      <textarea value={result} disabled={true} />
      <button onClick={handleConvert}>convert</button>
      <Notify isOpen={true} />
    </div>
  );
};
