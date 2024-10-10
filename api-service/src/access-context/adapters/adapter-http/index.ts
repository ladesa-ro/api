import { RequestActorHttp } from "@/infrastructure/authentication";
import { ResolveAccessContextPipe } from "../-pipes";

export const AccessContextHttp = (options?: any) => RequestActorHttp(options, ResolveAccessContextPipe);
