import { computed } from 'vue'
import { mapState, Store, useStore } from 'vuex';

export default function useState<T extends string>(map: T[]) : Record<T, any> {
    const store = useStore()
    const storeStateFns = mapState(map)
    return computedState(storeStateFns, store);
};


export function useStateWitNamespace<T extends string>(namespace: string, map: T[]) : Record<T, any> {
    const store = useStore()
    const storeStateFns = mapState(namespace, map)
    return computedState(storeStateFns, store);
}

function computedState<T extends string>(storeStateFns: Record<T, (state: any, getters: any) => any>, store: Store<any>) : Record<T, any> {
    const storeState: any = {};
    
    for (const key in storeStateFns) {
        storeState[key] = computed(() => storeStateFns[key](store.state, store.getters));
    }
    return storeState
}
