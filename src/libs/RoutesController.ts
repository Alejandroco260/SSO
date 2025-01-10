interface CStructureRoutesInterface {
    RoutesUser: {
        controller: string;
        get: string;
        getOne: string;
        post: string;
        put: string;
        delete: string;
    };
}

export const RoutesControllers = {
    RoutesUser: {
        controller: 'user',
        get: '',
        getOne: ':id',
        post: '',
        put: '',
        delete: '',
    },

}
