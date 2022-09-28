import * as React from "react";
import { useInput } from "../../hooks/useInput";
import { convert } from "../../utils/converter";
import { TConvertTypes } from "../../@types/converter";
import { useNotify } from "../../hooks/notify";

export const Converter: React.FC = () => {
  const { addNotify } = useNotify();
  const [type, setType] = React.useState<TConvertTypes>("standard");
  const { value, handleChange } = useInput();
  const { value: result, setValue: setValueResult } = useInput();

  const changeTextArea = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (/<svg(\.*?)/gi.test(e.target.value) && type !== "svg") setType("svg");
      handleChange(e);
    },
    [handleChange, type]
  );

  const handleConvert = React.useCallback(() => {
    const converted = convert(value, type);
    if (!converted) return;

    setValueResult(converted);
  }, [value, type, setValueResult]);

  return (
    <div className="converter">
      <textarea value={value} onChange={changeTextArea} />
      <textarea value={result} disabled={true} />
      <button onClick={handleConvert}>convert</button>
    </div>
  );
};
