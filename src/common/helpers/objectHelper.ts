export function sortObjectByKey(object: any): any {
    return Object.keys(object).sort().reduce(
        (obj: any, key: string) => {
            obj[key] = object[key];
            return obj;
        },
        {}
    );
}