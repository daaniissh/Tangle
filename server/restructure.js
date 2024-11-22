import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define the equivalent of __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to rename files to snake_case
const toSnakeCase = (str) => {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
};

// Mapping from old paths to new paths
const fileMappings = [
  // common components
  { oldPath: '../client/src/components/common/ExplorePost.tsx', newPath: '../client/src/components/common/ExplorePost.tsx' },
  { oldPath: '../client/src/components/common/Header.tsx', newPath: '../client/src/components/common/Header.tsx' },
  { oldPath: '../client/src/components/common/Li.tsx', newPath: '../client/src/components/common/Li.tsx' },
  { oldPath: '../client/src/components/common/RightPannel.tsx', newPath: '../client/src/components/common/RightPannel.tsx' },
  { oldPath: '../client/src/components/common/Sidebar.tsx', newPath: '../client/src/components/common/Sidebar.tsx' },
  { oldPath: '../client/src/components/common/SubHeader.tsx', newPath: '../client/src/components/common/SubHeader.tsx' },

  // drawers components
  { oldPath: '../client/src/components/drawers/DropDown.tsx', newPath: '../client/src/components/drawers/DropDown.tsx' },
  { oldPath: '../client/src/components/drawers/NotificcationCom.tsx', newPath: '../client/src/components/drawers/NotificationCom.tsx' },
  { oldPath: '../client/src/components/drawers/SearchCom.tsx', newPath: '../client/src/components/drawers/SearchCom.tsx' },

  // loader components
  { oldPath: '../client/src/components/Loader/LoadingSpinner.tsx', newPath: '../client/src/components/loaders/LoadingSpinner.tsx' },

  // skeleton components
  { oldPath: '../client/src/components/skelton/PostSkeleton.tsx', newPath: '../client/src/components/skeletons/PostSkeleton.tsx' },
  { oldPath: '../client/src/components/skelton/RightPanelSkeleton.tsx', newPath: '../client/src/components/skeletons/RightPanelSkeleton.tsx' },
  { oldPath: '../client/src/components/skelton/SearchSkelton.tsx', newPath: '../client/src/components/skeletons/SearchSkeleton.tsx' },

  // ui components (PascalCase naming)
  { oldPath: '../client/src/components/ui/Avatar.tsx', newPath: '../client/src/components/ui/Avatar.tsx' },
  { oldPath: '../client/src/components/ui/Button.tsx', newPath: '../client/src/components/ui/Button.tsx' },
  { oldPath: '../client/src/components/ui/Dialog.tsx', newPath: '../client/src/components/ui/Dialog.tsx' },
  { oldPath: '../client/src/components/ui/Drawer.tsx', newPath: '../client/src/components/ui/Drawer.tsx' },
  { oldPath: '../client/src/components/ui/DropdownMenu.tsx', newPath: '../client/src/components/ui/DropdownMenu.tsx' },
  { oldPath: '../client/src/components/ui/Form.tsx', newPath: '../client/src/components/ui/Form.tsx' },
  { oldPath: '../client/src/components/ui/InputOtp.tsx', newPath: '../client/src/components/ui/InputOtp.tsx' },
  { oldPath: '../client/src/components/ui/Input.tsx', newPath: '../client/src/components/ui/Input.tsx' },
  { oldPath: '../client/src/components/ui/Label.tsx', newPath: '../client/src/components/ui/Label.tsx' },
  { oldPath: '../client/src/components/ui/Progress.tsx', newPath: '../client/src/components/ui/Progress.tsx' },
  { oldPath: '../client/src/components/ui/Separator.tsx', newPath: '../client/src/components/ui/Separator.tsx' },
  { oldPath: '../client/src/components/ui/Sheet.tsx', newPath: '../client/src/components/ui/Sheet.tsx' },
  { oldPath: '../client/src/components/ui/Sidebar.tsx', newPath: '../client/src/components/ui/Sidebar.tsx' },
  { oldPath: '../client/src/components/ui/Skeleton.tsx', newPath: '../client/src/components/ui/Skeleton.tsx' },
  { oldPath: '../client/src/components/ui/Switch.tsx', newPath: '../client/src/components/ui/Switch.tsx' },
  { oldPath: '../client/src/components/ui/Tooltip.tsx', newPath: '../client/src/components/ui/Tooltip.tsx' },

  // upload components
  { oldPath: '../client/src/components/uploade/Create.tsx', newPath: '../client/src/components/upload/Create.tsx' },

  // hooks
  { oldPath: '../client/src/hooks/UseMobile.tsx', newPath: '../client/src/hooks/UseMobile.tsx' },
  { oldPath: '../client/src/hooks/UseScreenDevice.tsx', newPath: '../client/src/hooks/UseScreenDevice.tsx' },

  // interfaces
  { oldPath: '../client/src/interfaces/Icon.ts', newPath: '../client/src/interfaces/Icon.ts' },

  // lib
  { oldPath: '../client/src/lib/Utils.ts', newPath: '../client/src/lib/Utils.ts' },

  // logos
  { oldPath: '../client/src/logos/CirqlLogoG.tsx', newPath: '../client/src/logos/CirqlLogoG.tsx' },
  { oldPath: '../client/src/logos/CirqlLogoW.tsx', newPath: '../client/src/logos/CirqlLogoW.tsx' },
  { oldPath: '../client/src/logos/CirqlLogo.svg', newPath: '../client/src/logos/CirqlLogo.svg' },
  { oldPath: '../client/src/logos/Cirql.tsx', newPath: '../client/src/logos/Cirql.tsx' },

  // schemas
  { oldPath: '../client/src/schemas/LoginSchema.ts', newPath: '../client/src/schemas/LoginSchema.ts' },
  { oldPath: '../client/src/schemas/SignupSchema.ts', newPath: '../client/src/schemas/SignupSchema.ts' },
];


// Function to rename and move files
fileMappings.forEach(({ oldPath, newPath }) => {
  const oldFilePath = path.join(__dirname, oldPath);
  const newFilePath = path.join(__dirname, newPath);
  const newDirPath = path.dirname(newFilePath);

  if (fs.existsSync(oldFilePath)) {
    if (!fs.existsSync(newDirPath)) {
      fs.mkdirSync(newDirPath, { recursive: true });
    }

    fs.renameSync(oldFilePath, newFilePath);
    console.log(`Moved: ${oldFilePath} -> ${newFilePath}`);
  } else {
    console.log(`File not found: ${oldFilePath}`);
  }
});
