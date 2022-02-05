import { ThreadStatusEnum } from "../Enum/threadStatusEnum";

export default class ThreadInfo{
    id: number ;
    status: ThreadStatusEnum;
    result: any;
    error:{
        message: string,
        type: string
    }
}