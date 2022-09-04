import { useEffect, useReducer, useCallback, EffectCallback } from "react";
import debounce from "lodash/debounce";

const INTERSECTION_THRESHOLD = 100;
const LOAD_DELAY_MS = 100;

const reducer = (state: any, action: any) => {
   switch (action.type) {
      case "set": {
         return {
            ...state,
            ...action.payload,
         };
      }
      case "onGrabData": {
         return {
            ...state,
            loading: false,
            data: [...state.data, ...action.payload.data],
            currentPage: !action.payload.data.length ? state.currentPage : state.currentPage + 1,
         };
      }
      default:
         return state;
   }
};

interface LazyLoadParam {
   triggerRef?: any;
   onGrabData: (num: number) => void;
   options?: any;
}

const useLazyLoad = ({ triggerRef, onGrabData, options }: LazyLoadParam) => {
   const [state, dispatch] = useReducer(reducer, {
      loading: false,
      currentPage: 1,
      data: [],
   });

   const _handleEntry = async (entry: any): Promise<any> => {
      const boundingRect = entry.boundingClientRect;
      const intersectionRect = entry.intersectionRect;

      if (
         !state.loading &&
         entry.isIntersecting &&
         intersectionRect.bottom - boundingRect.bottom <= INTERSECTION_THRESHOLD
      ) {
         dispatch({ type: "set", payload: { loading: true } });
         const data = await onGrabData(state.currentPage);
         dispatch({ type: "onGrabData", payload: { data } });
      }
   };
   const handleEntry = debounce(_handleEntry, LOAD_DELAY_MS);

   const onIntersect = useCallback(
      (entries: any): void => {
         handleEntry(entries[0]);
      },
      [handleEntry]
   );

   useEffect(() => {
      if (triggerRef.current) {
         if (triggerRef.current.className.includes("visible")) return;

         const container = triggerRef.current;
         const observer = new IntersectionObserver(onIntersect, options);

         observer.observe(container);

         return () => {
            observer.disconnect();
         };
      }
   }, [triggerRef, handleEntry]);

   return state;
};

export default useLazyLoad;
