interface JSONResponseModel {
    success: boolean;
    status: number;
    data?: any;
}

export class ResponseSuccess<T> implements JSONResponseModel {
    constructor(public message: string, public status: number, public success: boolean, public data: T) {}
    
    static EMPTY_MODEL = {
        message: 'Success',
        status: 200,
        success: true
    };
}

export class ResponseError implements JSONResponseModel {
    constructor(public error: string, public status: number, public success: boolean) {}

    static EMPTY_MODEL = {
        message: 'Failed',
        status: 400,
        success: false
    };
}


