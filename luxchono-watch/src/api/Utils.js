
export const prepareHeaders = (headers) => {
    const token = localStorage.getItem('lw-token');
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
};

export const  TOKEN  = localStorage.getItem('lw-token');

