import * as hare from "./hare";
import * as _ from "lodash";
import { expect } from "chai";
import "mocha";

describe('.tokenize()', () => {
  it('should return an array of tokens', () => {
    const str = "(hello 1 2 3)";
    const tokens = hare.tokenize(str);
    expect(tokens.length == str.length);
    expect(tokens[0]).to.equal('(');
    expect(tokens[1]).to.equal('hello');
    expect(tokens[2]).to.equal('1');
    expect(tokens[3]).to.equal('2');
    expect(tokens[4]).to.equal('3');
    expect(tokens[5]).to.equal(')');
  });
});