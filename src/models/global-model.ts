import { $http, API } from '@/common/http';
interface State {
    list: any[],
    name: string,
    login: boolean,
    packagesList: any[],
    TodoTotal: any[],
    OrderTotal: any[],
    RemitTodoTotal: any[],
    RemitTotal: any[],
    InvoiceTodoTotal: any[],
    InvoiceTotal: any[]
}

interface ActionFc {
    type: string,
    resData: any,
    key: string
}

const initState: State = {
    list: [1, 2],
    name: '张三',
    login: false,
    packagesList: [],
    TodoTotal: [],
    OrderTotal: [],
    RemitTodoTotal: [],
    RemitTotal: [],
    InvoiceTodoTotal: [],
    InvoiceTotal: []
}


export default {
    namespace: 'global',
    state: initState,
    reducers: {
        update(state: State, action: ActionFc) {
            const newState: any = { ...state };
            newState[action.key] = action.resData
            return { ...newState };
        }
    },
    effects: {
        // *fetch(action, { call: , put }) {
        //     const { data, headers } = yield call(usersService.fetch, { page });
        //     yield put({ type: 'save', payload: { data, total: headers['x-total-count'] } });
        // },

        *queryPackagesList(action: any, { call, put }: any): any {
            const result = yield call(() => $http.get(API.queryPackagesList));
            localStorage.setItem('hy_packageList', JSON.stringify(result.data || []));
            yield put({
                type: 'update',
                resData: result.data || [],
                key: 'packagesList'
            })
        },
        *queryTodoTotal(action: any, { call, put }: any): any {
            const result = yield call(() => $http.get(API.queryTodoTotal));
            yield put({
                type: 'update',
                resData: result.data,
                key: 'TodoTotal'
            })
        },
        *queryOrderTotal(action: any, { call, put }: any): any {
            const result = yield call(() => $http.get(API.queryOrderTotal));
            yield put({
                type: 'update',
                resData: result.data,
                key: 'OrderTotal'
            })
        },
        *queryRemitTodoTotal(action: any, { call, put }: any): any {
            const result = yield call(() => $http.get(API.queryRemitTodoTotal));
            yield put({
                type: 'update',
                resData: result.data,
                key: 'RemitTodoTotal'
            })
        },
        *queryRemitTotal(action: any, { call, put }: any): any {
            const result = yield call(() => $http.get(API.queryRemitTotal));
            yield put({
                type: 'update',
                resData: result.data,
                key: 'RemitTotal'
            })
        },
        *queryInvoiceTodoTotal(action: any, { call, put }: any): any {
            const result = yield call(() => $http.get(API.queryInvoiceTodoTotal));
            yield put({
                type: 'update',
                resData: result.data,
                key: 'InvoiceTodoTotal'
            })
        },
        *queryInvoiceTotal(action: any, { call, put }: any): any {
            const result = yield call(() => $http.get(API.queryInvoiceTotal));
            yield put({
                type: 'update',
                resData: result.data,
                key: 'InvoiceTotal'
            })
        }
    },
    subscriptions: {
        // setup({ dispatch, history }) {
        //     return history.listen(({ pathname, query }) => {
        //         if (pathname === '/users') {
        //             dispatch({ type: 'fetch', payload: query });
        //         }
        //     });
        // },
    },
};