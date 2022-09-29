import * as React from "react";
import { useInput } from "../../hooks/useInput";
import { convert } from "../../utils/converter";
import { TConvertTypes } from "../../@types/converter";
import { useCopy } from "../../hooks/useCopy";

export const Converter: React.FC = () => {
  const { copy } = useCopy();
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

  const handleResult = React.useCallback(async () => {
    await copy(result);
  }, [copy, result]);

  return (
    <div className="converter">
      <textarea value={value} onChange={changeTextArea} />
      <textarea onClick={handleResult} defaultValue={result} readOnly />
      <button onClick={handleConvert}>convert</button>
    </div>
  );
};
