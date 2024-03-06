import type { NodePlopAPI } from "plop";
import { Generators } from "./generators";
import { ChangeCaseHelper } from "./helpers";

export default function (plop: NodePlopAPI) {
  ChangeCaseHelper(plop);
  Generators(plop);
}
