export const errorHandler = (error) => {
    if (error.response) {
        return error.response.data;
    } else if (error.request) {
        return error.message;
    } else {
        return 'Something went wrong';
    }
};
