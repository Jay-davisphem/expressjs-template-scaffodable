"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Length = void 0;
function Length(min = -1, max = -1) {
    return function (target, context) {
        if (context.kind === "field") {
            console.log(target);
            console.log(context);
            let currentValue;
            const getter = function () {
                return currentValue;
            };
            const setter = function (newValue) {
                if (min < 0 && newValue.length < min) {
                    throw new Error(`Object length should be bigger than ${min} in length`);
                }
                if (max !== -1 && newValue.length > max) {
                    throw new Error(`Objct length should be lesser than ${max} in length`);
                }
                else {
                    currentValue = newValue;
                }
            };
            Object.defineProperty(target, context.name, {
                get: getter,
                set: setter
            });
        }
    };
}
exports.Length = Length;
