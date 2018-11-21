const chai = require("chai");
chai.should();

const test_string = `
        Here in lies all that matters: a number, 1.01, a symbol, #, a string,
        "some day", the brackets, [{<()>}], and the rest, +=!@.

    `;

const whind = require("../build/whind_cjs.js");
const constr = whind.constructor;

describe("Test", function() {

    let types = constr.prototype.types;

    it("Correctly parses string, ignoring whites space, and creates token lexums matching character syntax.", function() {
        let lex = whind(test_string);
        lex.tx.should.equal("Here");
        lex.n().n().n().n().tx.should.equal("that");
        lex.n().n().ch.should.equal(":");
        let lex_copy = lex.copy();
        lex_copy.off += 1;
        lex.n().n().n().n().ty.should.equal(types.number);
        lex.n().slice(lex_copy).should.equal(" a number, 1.01");
        lex.n().n().n().n().ty.should.equal(types.symbol);
        lex.n().n().n().n().n().ty.should.equal(types.string);
        lex.n().n().n().n().n().ty.should.equal(types.open_bracket);
        lex.ch.should.equal("[");
        lex.n().ty.should.equal(types.open_bracket);
        lex.ch.should.equal("{");
        lex.n().ty.should.equal(types.operator);
        lex.ch.should.equal("<");
        lex.n().ty.should.equal(types.open_bracket);
        lex.ch.should.equal("(");
        lex.n().ty.should.equal(types.close_bracket);
        lex.n().ty.should.equal(types.operator);
        lex.n().ty.should.equal(types.close_bracket);
        lex.n().ty.should.equal(types.close_bracket);
        lex.n().ty.should.equal(types.symbol);
        let start = lex.pos + 1;
        lex.n().n().n().n().ch.should.equal(",");
        lex.n().slice(start).should.equal(" and the rest, ");
        lex.ty.should.equal(types.operator);
        lex.n().ty.should.equal(types.operator);
        lex.n().ty.should.equal(types.operator);
        lex.n().ty.should.equal(types.symbol);
        lex.n().ty.should.equal(types.symbol);
        lex.n().END.should.equal(true);
    });
    /*
    it("Identifies \' in a abbreviation as part of the word.", function() {
        let lex = new constr(`We're always glad to be of service. Let's never forget why we're here.`);
        lex.a("We're").a("always").a("glad").a("to").a("be").a("of").a("service").a(".").
        lex.a("Let's").a("never").a("forget").a("why").a("we're").a("here").a(".");
    });
    */
});
