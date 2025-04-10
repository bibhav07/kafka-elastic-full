import { STATUS_CODES } from "./status.codes";


class BaseError extends Error {
    public readonly name: string;
    public readonly status: number;
    public readonly message: string;

    constructor(name: string, status: number, description: string) {
        super(description);
        this.name = name;
        this.status = status;
        this.message = description;


        // Object.setPrototypeOf(this, new.target.prototype); -> this is the error instance.
        // new.target refers to the constructor that was directly called (CustomError).
        // new.target.prototype gives the prototype that the instance should have.
        // So Object.setPrototypeOf(this, new.target.prototype) says:
        // “Hey JS, please make sure this error instance behaves like an instance of CustomError, not just plain Error.”
        // Without Object.setPrototypeOf, your CustomError is born with a tag that says "Error".
        // With Object.setPrototypeOf, you rip off the wrong tag and replace it with "CustomError" — so everyone knows who it really is!

        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);

    }


};


//500 internal error
export class APIError extends BaseError {
    constructor(description = "api error"){
        super(
            "api internal server error",
            STATUS_CODES.INTERNAL_ERROR,
            description
        );
    }
}


//validation error
export class ValidationError extends BaseError {
    constructor(description = "bad request"){
        super(
            "bad request",
            STATUS_CODES.BAD_REQUEST,
            description
        );
    }
}

//403 authorize error
export class AuthorizeError extends BaseError {
    constructor(description = "access denied") {
        super("access denied", STATUS_CODES.UN_AUTHORISED, description);
    };
};

//404 not found
export class NotFoundError extends BaseError {
    constructor(description = "not found") {
        super(description, STATUS_CODES.NOT_FOUND, description);
    };
}