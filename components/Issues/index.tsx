"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IssueFor {
  title: string;
  description: string;
}

const IssuesPage = () => {
  const [error, setErrorMessage] = useState("");
  const { register, control, handleSubmit } = useForm<IssueFor>();
  const router = useRouter();

  const handleFormSubmit = async (data: IssueFor) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (e) {
      setErrorMessage("An unexpected error occurred");
    }
  };
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit((data) => handleFormSubmit(data))}
      >
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <Button>Submit New Issues</Button>
      </form>
    </div>
  );
};

export default IssuesPage;
