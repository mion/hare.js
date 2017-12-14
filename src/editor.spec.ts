import * as editor from "./editor";
import * as _ from "lodash";
import { expect } from "chai";
import "mocha";

describe( '.replace()', () =>
{
  //////////////////////////////////////////////////////////////////////////////
  it( 'should not change anything if the indexes are empty', () =>
  {
    // setup
    const array = ['foo', 'bar', 'baz']
    const indexes:Array<number> = []
    // stress
    const array2 = editor.replace(array, indexes)
    // test
    expect( array2 ).to.deep.equal( array );
  });
});
