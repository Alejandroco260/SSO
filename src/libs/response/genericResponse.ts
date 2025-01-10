export class GenericResponse<T> {
    private _status: number;
    private _description: string;
    private _response: T;

    constructor(status?: number, description?: string, response?: T) {
        this._status = status;
        this._description = description;
        this._response = response;
    }

    // Getters
    get status(): number {
        return this._status;
    }

    get description(): string {
        return this._description;
    }

    get response(): T {
        return this._response;
    }

    // Setters
    set status(status: number) {
        this._status = status;
    }

    set description(description: string) {
        this._description = description;
    }

    set response(response: T) {
        this._response = response;
    }
}
