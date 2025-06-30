const getFullPath = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http://')) {
        return path;
    }
    return `${process.env.NEXT_PUBLIC_API_URL}/${path}`;
};
export { getFullPath };
