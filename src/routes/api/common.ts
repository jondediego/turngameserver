import GenericResponse from "../../model/responses/GenericResponse";
import ErrorResponse from "../../model/responses/ErrorResponse";
import {ScheduleGenerationErrorResponse} from "../../model/responses/ScheduleGenerationErrorResponse";


class CommonController {

    public async createResponse(callbackFunc: Function) {
        let response: GenericResponse | ErrorResponse | ScheduleGenerationErrorResponse;
        try {
            await callbackFunc();
            response = {
                ok: true
            }
        } catch (err) {
           console.error("Error al generar respuesta: "+ err.stack+ " message: "+err.message);
            if (err.type){
                //ErrorResponse
                response = {
                    ok: false,
                    message: err.message,
                    type: err.type
                }
            }else{
                //GenericScheduleErrorReponse
                response = {
                    ok: false,
                    message: err.message
                }
            }
        } finally {
            return response;
        }
    }
}

export default CommonController;