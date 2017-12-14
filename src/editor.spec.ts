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
    const array2 = editor.replace(array, indexes, 'quux')
    // test
    expect( array2 ).to.deep.equal( array );
  });
  //////////////////////////////////////////////////////////////////////////////
  it( 'should change one element for a single index', () =>
  {
    // setup
    const array = ['foo', 'bar', 'baz']
    const indexes:Array<number> = [1]
    // stress
    const array2 = editor.replace(array, indexes, 'quux')
    // test
    expect( array2 ).to.deep.equal( ['foo', 'quux', 'baz'] );
  });
  //////////////////////////////////////////////////////////////////////////////
  it( 'should not change anything for an out of bounds index', () =>
  {
    // setup
    const array = ['foo', 'bar', 'baz']
    const indexes:Array<number> = [3]
    // stress
    const array2 = editor.replace(array, indexes, 'quux')
    // test
    expect( array2 ).to.deep.equal( array );
  });
});
