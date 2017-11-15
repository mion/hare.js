import * as hare from "./hare";
import * as _ from "lodash";
import { expect } from "chai";
import "mocha";

describe( '.tokenize()', () =>
{
  it( 'should work with a flat list string', () =>
  {
    const str = "(hello 1 2 3)";
    const tokens = hare.tokenize( str );
    //
    // We expect `tokens` to be:
    //
    //    ["(", "hello", "1", "2", "3", ")"]
    //
    expect( tokens.length ).to.equal( 6 );
    expect( tokens[0] ).to.equal( '(' );
    expect( tokens[1] ).to.equal( 'hello' );
    expect( tokens[2] ).to.equal( '1' );
    expect( tokens[3] ).to.equal( '2' );
    expect( tokens[4] ).to.equal( '3' );
    expect( tokens[5] ).to.equal( ')' );
  });
  it('should work with a nested list string', () =>
  {
    const str = "(hello 1 (2 3) (4 5) 6)";
    const tokens = hare.tokenize(str);
    //
    // We expect `tokens` to be:
    //
    //    ["(", "hello", "1", "(", "2", "3", ")", "(", "4", "5", ")", "6"]
    //
    expect( tokens.length ).to.equal( 13 );
    expect( tokens[0] ).to.equal( '(' );
    expect( tokens[1] ).to.equal( 'hello' );
    expect( tokens[2] ).to.equal( '1' );
    expect( tokens[3] ).to.equal( '(' );
    expect( tokens[4] ).to.equal( '2' );
    expect( tokens[5] ).to.equal( '3' );
    expect( tokens[6] ).to.equal( ')' );
    expect( tokens[7] ).to.equal( '(' );
    expect( tokens[8] ).to.equal( '4' );
    expect( tokens[9] ).to.equal( '5' );
    expect( tokens[10] ).to.equal( ')' );
    expect( tokens[11] ).to.equal( '6' );
    expect( tokens[12] ).to.equal( ')' );
  });
});
