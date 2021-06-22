import {inject, Injectable} from "./injector";


module SimpleTest {
    @Injectable()
    export class Svc {
        val = 2;
    }

    class Test {
        svc = inject(Svc);
    }

    class Test2 {
        svc = inject(Svc);
    }


    test("Simple Injection works", () => {
        const t = new Test();
        expect(t.svc).toBeInstanceOf(Svc);
        t.svc.val = 4;
        const y = new Test2();
        expect(y.svc.val).toBe(4);
    });
}

module ScopedTest {

    @Injectable()
    class Test {
        x = 1;
    }

    test("Scoped Injection works", () => {
        const t = inject(Test);
        expect(t.x).toBe(1);
        t.x = 2;

        const t2 = inject(Test, "myscope");
        expect(t2.x).toBe(1);
        t2.x = 3;
        const t3 = inject(Test, "myscope");
        expect(t3.x).toBe(3);
    });


}
module ReplaceTest {

    @Injectable()
    export class Svc2 {
        val = 2;
    }

    @Injectable({replace: Svc2})
    class OverrideSvc implements Svc2 {
        x = 4;
        y = 5;
        val = 3
    }

    test("Replace Injection works", () => {
        const svc = inject(Svc2) as OverrideSvc;
        expect(svc).toBeInstanceOf(OverrideSvc);
        expect(svc.x).toBe(4);
        expect(svc.y).toBe(5);
    });
}
