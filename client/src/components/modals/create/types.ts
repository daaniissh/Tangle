import forms from "./Comps";

export type FormSubmitData = {
  image?: File | Blob | null | string;
  caption?: string;
  file?: File | Blob | null;
};

export type Forms = keyof typeof forms;

export type FormsState = {
  [K in Forms]: {
    image?: File | Blob | null | string;
    caption?: string;
    file?: File | Blob | null;
  };
};

export type FormProps = {
  formsState: FormsState;
  onSubmit: (data: FormSubmitData) => void;
  gotoForm: (form: Forms) => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
