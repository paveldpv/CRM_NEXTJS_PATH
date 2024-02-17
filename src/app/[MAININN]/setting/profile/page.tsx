import ProgressLoader from "@/components/UI/Loaders/ProgressLoader";
import DialogWindow from "@/components/additional/DialogWindow";

import FormProfile from "@/components/form/formProfile/FormProfile";

export default function page() {
  return (
    <div className="mt-2">
      <FormProfile />
      <ProgressLoader />      
      <DialogWindow/>
    </div>
  );
}
