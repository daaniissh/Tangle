import React, {  useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/Dialog"; // Assuming Dialog is updated as shown above

import forms from "./Comps";
import { Forms, FormsState, FormSubmitData } from "./types";
import CreateHeader from "./CreateHeader";

export function PostDialog({ children }: { children: React.ReactNode }) {
  const [form, setForm] = useState<Forms>("SelectImage");
  const [isOpen, setIsOpen] = useState(false);

  const currentForm = forms[form];
  const initialFormsState: FormsState = Object.fromEntries(
    Object.keys(forms).map((key) => [key, {}])
  ) as FormsState;
  const [formState, setFormState] = useState<FormsState>(initialFormsState);

  // Ref for Dialog


  function onSubmit(data: FormSubmitData) {
    setFormState((prevState) => ({
      ...prevState,
      [form]: data,
    }));

  }
  console.log(formState.SelectImage, "select")
  console.log(formState.CropImage, "crop")
  console.log(formState.UploadPost, "post")
  function gotoForm(newForm: Forms) {
    setForm(newForm);

  }

  // Effect for showing or closing dialog based on modal state


  const FormComponent = currentForm;
  return (

    <Dialog open={isOpen} onOpenChange={setIsOpen}  >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={`${form === "UploadPost" && "max-w-4xl"} border w-11/12 md:w-full outline-none`}>
        <CreateHeader form={form} gotoForm={gotoForm} />
        {FormComponent && (
          <FormComponent setIsOpen={setIsOpen} formsState={formState} onSubmit={onSubmit} gotoForm={gotoForm} />
        )}
      </DialogContent>
    </Dialog>
  );
}
