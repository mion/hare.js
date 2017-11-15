import * as hare from "./hare";
import * as _ from "lodash";
import { expect } from "chai";
import "mocha";

describe( '.tokenize()', () =>
{
  //////////////////////////////////////////////////////////////////////////////
  it( 'should work with a flat list string', () =>
  {
    // setup
    const str = "(hello 1 2 3)";
    // stress
    const tokens = hare.tokenize( str );
    // test
    expect( tokens.length ).to.equal( 6 );
    expect( tokens[0] ).to.equal( '(' );
    expect( tokens[1] ).to.equal( 'hello' );
    expect( tokens[2] ).to.equal( '1' );
    expect( tokens[3] ).to.equal( '2' );
    expect( tokens[4] ).to.equal( '3' );
    expect( tokens[5] ).to.equal( ')' );
  });
  //////////////////////////////////////////////////////////////////////////////
  it('should work with a nested list string', () =>
  {
    // setup
    const str = "((1) (2 (3) 4) (5 (6)) 7)";
    const expectedTokens = [
      '(', '(', '1', ')', '(', '2', '(', '3', ')', '4', ')', '(', '5', '(', '6', ')', ')', '7', ')'
    ];
    // stress
    const tokens = hare.tokenize(str);
    // test
    expect( tokens ).to.deep.equal( expectedTokens );
  });
  //////////////////////////////////////////////////////////////////////////////
  it('should work with a list that has empty lists', () =>
  {
    // setup
    const str = "(() hello (1) (() 3 ()))";
    const expectedTokens = [
      '(', '(', ')', 'hello', '(', '1', ')', '(', '(', ')', '3', '(', ')', ')', ')'
    ];
    // stress
    const tokens = hare.tokenize(str);
    // test
    expect( tokens ).to.deep.equal( expectedTokens );
  });
});
