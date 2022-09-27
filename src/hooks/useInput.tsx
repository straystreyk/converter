import * as React from "react";

export const useInput = () => {
  const [value, setValue] = React.useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
  };

  return React.useMemo(() => ({ value, handleChange, setValue }), [value]);
};
