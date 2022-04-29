import { Button, TextField } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import { Todo } from "../types/todoTypes";

interface TodoFormProps {
  onCreate(arg: Todo): void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onCreate }) => {
  const [text, setText] = useState("");

  const handleCreate: React.FormEventHandler<HTMLFormElement> = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onCreate({ todo: text, created: new Date(), done: false });
      setText("");
    },
    [onCreate, text]
  );

  const isDisabled = useMemo(() => {
    return text.trim().length === 0;
  }, [text]);

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}
    >
      <form onSubmit={handleCreate}>
        <TextField
          value={text}
          label="Enter Task"
          onChange={(e) => {
            setText(e.target.value);
          }}
          sx={{
            marginRight: 2,
            width: "500px",
          }}
          size="small"
        />
        <Button
          type="submit"
          size="large"
          disabled={isDisabled}
          sx={{
            backgroundColor: "#5162FF",
            color: "#ffffff",
            height: "40px",
            width: "100px",
          }}
        >
          Create
        </Button>
      </form>
    </div>
  );
};
