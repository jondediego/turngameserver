import GenericReponse from "./GenericResponse";
export class OneUserResponse extends GenericReponse {
    user:{
        id: number;
        email: string;
        name: string;
    }

}