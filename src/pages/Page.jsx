import { useEffect } from "react";

const Page = (props) => {
  useEffect(() => {
    document.title = "FormGPT - " + props.title || "FormGPT";
  }, [props.title]);
  return props.children;
};

export default Page;