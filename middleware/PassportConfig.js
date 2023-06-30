"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
class PassportConfig {
    constructor(strategies) {
        this.strategies = strategies;
        this.addStrategies();
    }
    ;
    /*
     FIX ME 😭
     The problem with this class is... if the caller forgets to call
     the addStrategies method...our program won't work.

     Solution: You should refactor this class to take a constructor
     which receives strategies: PassportStrategy[]. Internally...call
     the addStrategies method within the constructor and make addStragies
     private from the outside world. This way, we can GUARANTEE that our
     passport strategies are added when this class is created. ⭐️
    */
    addStrategies() {
        this.strategies.forEach((pStrategy) => {
            passport_1.default.use(pStrategy.name, pStrategy.strategy);
        });
    }
    ;
    initializeStrategies() {
        this.addStrategies();
    }
    ;
}
exports.default = PassportConfig;
;
