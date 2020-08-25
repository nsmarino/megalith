import {useState, useEffect } from 'react'

function useMediaQuery(queries, values, defaultValue) {

    // Array containing a media query list for each query
    const mediaQueryLists = queries.map(q => window.matchMedia(q));
  
    // Function that gets value based on matching media query
    const getValue = () => {
      // Get index of first media query that matches
      const index = mediaQueryLists.findIndex(mql => mql.matches);
      // Return related value or defaultValue if none
      return typeof values[index] !== 'undefined' ? values[index] : defaultValue;
    };
  
    const [value, setValue] = useState(getValue);

    useEffect(() => {
      const handler = () => setValue(getValue);
      // Set a listener for each media query with above handler as callback.
      mediaQueryLists.forEach(mql => mql.addListener(handler));
      return () => mediaQueryLists.forEach(mql => mql.removeListener(handler));
    }, [] );

    return value;
  
  }

export default useMediaQuery


// Example:
// const columnCount = useMediaQuery(
//     // Media queries
//     ['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)'],
//     // Column counts (relates to above media queries by array index)
//     [5, 4, 3],
//     // Default column count
//     2
//   );