import * as hare from "./hare";
import * as _ from "lodash";
import { expect } from "chai";
import "mocha";

describe('.tokenize()', () => {
  it('should return an array of tokens', () => {
    const str = "(hello 1 2 3)";
    const tokens = hare.tokenize(str);
    expect(tokens).to.equal(['(', 'hello', '1', '2', '3', ')']);
  });
});
