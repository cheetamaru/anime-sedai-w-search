import { MalStatusType } from "./MalStatusType";

export type MalGetListParams = {
    status?: MalStatusType;
    limit?: number;
    offset?: number;
}
