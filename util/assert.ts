
export function isPrimitive(val: any) :boolean{
    switch (typeof val) {
        case "string":
        case "number":
        case "boolean":
        case "symbol":
            return true;
        default:
            return false;
    }

}
