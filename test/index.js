import { assert } from 'chai';
import { mxc } from '../src';

describe('Awesome test.', () => {
    // it('should test default awesome function', () => {
    //   const expectedVal = 'I am the Default Awesome Function, fellow comrade! - Dinesh';
    //   assert(defaultAwesomeFunction('Dinesh') === expectedVal, 'Default not awesome :(');
    // });

    // it('should test awesome function', () => {
    //   const expectedVal = 'I am just an Awesome Function';
    //   assert(awesomeFunction() === expectedVal, 'Named awesome :(');
    // });

    it('should test awesome function', () => {
        const expectedVal = 'I am just an Awesome Function';
        assert(expectedVal === 'I am just an Awesome Function', 'Named awesome :(');

        mxc.start({ index: 1 })
            .then((state) => {
                const newState = mxc.change(state, 'index', 2);
                console.log('newState', newState);
                assert(newState['index'] === 2, 'name\'s not equal');
            });
        
        const stateToModify = {
            level_1: {
                level_2: {
                    level_3: 'value_3'
                }
            }
        };
        mxc.start(stateToModify)
            .then((state) => {
                console.log(state);
                return state;
            })
            .then((state) => {
                const changes = {};
                changes['index'] = 2;
                changes['level_1.level_value'] = 'value_1';
                changes['level_1.level_2.level_3'] = 'value_3_modified';

                const newState = mxc.change(state, changes);
                console.log(newState);
            });
    });
});
