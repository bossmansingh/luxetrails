import { PageType, pageTypes, poppinsFont } from "@/util/Constants";
import { useMemo } from "react";

const ModalTitle: React.FC<{ pageType: PageType }> = ({ pageType }) => {
  var selectedPage = useMemo(
    () => pageTypes.find((v) => v.value === pageType),
    [pageType]
  );
  return (
    selectedPage && (
      <h1 className={poppinsFont.className} style={poppinsFont.style}>
        {`Enter ${selectedPage.label} info`}
      </h1>
    )
  );
};

export default ModalTitle;
