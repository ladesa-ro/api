import { RequestActorGql } from "@/infrastructure/authentication";
import { ResolveAccessContextPipe } from "../-pipes";

export const AccessContextGraphQl = (options?: any) => RequestActorGql(options, ResolveAccessContextPipe);
