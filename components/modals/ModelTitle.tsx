import { PageType, pageTypes, poppinsFont } from "@/util/Constants";
import { useState } from "react";

const ModelTitle: React.FC<{ pageType: PageType }> = ({ pageType }) => {
  var [pageTitle] = useState(pageTypes.find((v) => v.value === pageType));
  return (
    <h1 className={poppinsFont.className} style={poppinsFont.style}>
      Enter {pageTitle?.label} info
    </h1>
  );
};

export default ModelTitle;
