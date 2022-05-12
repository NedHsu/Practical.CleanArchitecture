import { computed } from 'vue'
import { mapState, useStore } from 'vuex';

export default function useState(map) {
    const store = useStore()
    const storeStateFns = mapState(map)
    return computedState(storeStateFns, store);
};


export function useStateWitNamespace(namespace, map) {
    const store = useStore()
    const storeStateFns = mapState(namespace, map)
    return computedState(storeStateFns, store);
}

function computedState(storeStateFns, store) {
    const storeState = {};
    Object.keys(storeStateFns).forEach(key => {
        const fn = storeStateFns[key].bind("$store", store);
        storeState[key] = computed(fn);
    });
    return storeState
}
