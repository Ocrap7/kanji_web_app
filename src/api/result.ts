import { ApiError } from "./errors"

export class Result<T, E> {
    readonly value?: T
    readonly error?: E

    constructor(value?: T, error?: E) {
        this.value = value
        this.error = error
    }

    static Ok = <T>(value: T) => {
        return new Result<T, undefined>(value)
    }

    static Error = <E>(error: E) => {
        return new Result<undefined, E>(undefined, error)
    }

    public ok(callback: (value: T) => void): this {
        if (this.value !== undefined) {
            callback(this.value)
        }
        return this
    }

    public err(callback: (error: E) => void): this {
        if (this.error !== undefined) {
            callback(this.error)
        }
        return this
    }
}

export type ApiResult<T> = Result<T, ApiError>
export type StatusResult<T> = ApiResult<{ status: number, value: T }>