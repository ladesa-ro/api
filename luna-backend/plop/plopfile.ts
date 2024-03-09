import type { NodePlopAPI } from "plop";
import { Generators } from "./generators";
import { Helpers } from "./helpers";

export default function (plop: NodePlopAPI) {
  Helpers(plop);
  Generators(plop);
}
