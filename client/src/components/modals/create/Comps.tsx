import Select from "./forms/ImageSelect";
import Crop from "./forms/ImageCrop";
import Post from "./forms/PostUpload";

// Define the type for forms keys
type Forms = "SelectImage" | "CropImage" | "UploadPost";

// Define the type for the forms object
const forms: Record<Forms, React.ComponentType<any>> = {
  SelectImage: Select,
  CropImage: Crop,
  UploadPost: Post,
};

export default forms;
