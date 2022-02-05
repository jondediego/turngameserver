import {GenericIdTable} from './GenericIdTable';

export class GenericTraceIdTable extends GenericIdTable {
    public createdBy: number;
    public createdDate: Date;
    public updatedBy: number;
    public updatedDate: Date;
    public deletedBy: number;
    public deletedDate: Date;
}