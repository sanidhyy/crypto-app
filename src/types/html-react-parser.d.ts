declare module "html-react-parser" {
  import type { ReactNode } from "react";

  function HTMLReactParser(html: string): ReactNode;
  export default HTMLReactParser;
}
