import cn from "classnames";
import classes from "../../styles/converter.module.scss";
import * as React from "react";
import { convert } from "../../utils/converter";
import { useInput } from "../../hooks/useInput";
import { useCopy } from "../../hooks/useCopy";
import { TConvertTypes } from "../../@types/converter";

export const ConverterWorkspace: React.FC<{
  type: TConvertTypes;
  handleType: (type: TConvertTypes) => void;
}> = ({ type, handleType }) => {
  const { copy } = useCopy();
  const { value, handleChange } = useInput();
  const { value: result, setValue: setValueResult } = useInput();

  const changeTextArea = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (/<svg(\.*?)>?/gi.test(e.target.value)) {
        type !== "svg" && handleType("svg");
        handleChange(e);
        return;
      }

      type !== "standard" && handleType("standard");
      handleChange(e);
    },
    [handleChange, handleType, type]
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
    <div className="converter-workspace">
      <textarea value={value} onChange={changeTextArea} />
      <textarea
        className={cn(result && classes.textAreaResult)}
        onClick={handleResult}
        defaultValue={result}
        disabled={!result}
        readOnly
      />
      <button onClick={handleConvert}>convert</button>
    </div>
  );
};
