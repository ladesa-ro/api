import type { NodePlopAPI } from "plop";
import { Generators } from "./generators";
import { ChangeCaseHelperPlop } from "./helpers";

export default function (plop: NodePlopAPI) {
  ChangeCaseHelperPlop(plop);
  Generators(plop);
}
