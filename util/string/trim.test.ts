import {trimBoth, trimLeading, trimTrailing} from "./trim";

test("trimLeading works", () => {
    const val = trimLeading("//x/", "/");
    expect(val).toBe("x/");
});

test("trimTrailing works", () => {
    const val = trimTrailing("//x////////", "/");
    expect(val).toBe("//x");
});

test("trimBoth works", () => {
    const val = trimBoth("/////xyx//xyx////////", "/");
    expect(val).toBe("xyx//xyx");
});
