import { $http, API } from '@/common/http';
import { getLangType } from '@/common/utils';
import { act } from 'react-test-renderer';
interface State {
    langType: '0' | '1'
}

const initState: State = {
    langType: getLangType()
}


export default {
    namespace: 'global',
    state: initState,
    reducers: {
        update(state: State, newState: {payload:State }) {
            console.log('state:;',state,'newState::',newState)
            return { ...newState.payload };
        }
    },
};