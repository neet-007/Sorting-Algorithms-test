import { useEffect, useState } from 'react'
import BubbleSort from './SortingComponent/BubbleSort'
import HeapSort from './SortingComponent/HeapSort'
import QuickSortBase from './SortingComponent/QuickSortBase'
import QuickSortDuplicate from './SortingComponent/QuickSortDuplicates'
import SelectionSort from './SortingComponent/SelectionSort'
import './App.css'

/**
 ---COMMANDS---
  * -2 setting sortCompelete of the sort to true
  * -1 intial state
  * > -1 sorting
 */

const ARR_COUNT = 30;
const ARR_MODES = ['random', 'sorted', 'reversed', 'with duplicates'] as const;
const MODES = ['all' , 'bubbleSort' , 'selectionSort' , 'quickSortBase' , 'quickSortDuplicates' , 'heapSort'] as const;

function App() {
  const [arr, setArr] = useState<number[]>(Array(ARR_COUNT).fill(0).map(() => Math.floor((Math.random() * (1 - 0.1) + 0.1) * 20)).sort((a, b) => a - b).reverse())
  const [mode, setMode] = useState<'all' | 'bubbleSort' | 'selectionSort' | 'quickSortBase' | 'quickSortDuplicates' | 'heapSort'>('all');
  const [isSorting, setIsSorting] = useState(false);
  const [sortCompleted, setSortCompleted] = useState({ quickSortDuplicates:false, bubbleSort:false, selectionSort:false, heapSort:false, quickSortBase:false });

  useEffect(() => {
    let condition = false;
    if (mode === 'all'){
      condition = Object.values(sortCompleted).every((completed) => completed);
    }else{
      condition = sortCompleted[mode]
    }
    if (condition){
      setIsSorting(false)
    }
  },Object.values(sortCompleted))

  function handleArray(mode:'random' | 'sorted' | 'reversed' | 'with duplicates'){
    if (mode === 'random'){
      setArr(Array(ARR_COUNT).fill(0).map(() => Math.floor((Math.random() * (1 - 0.1) + 0.1) * 20)));
    };
    if (mode === 'sorted'){
      setArr(Array(ARR_COUNT).fill(0).map(() => Math.floor((Math.random() * (1 - 0.1) + 0.1) * 20)).sort((a, b) => a - b));
    };
    if (mode === 'reversed'){
      setArr(Array(ARR_COUNT).fill(0).map(() => Math.floor((Math.random() * (1 - 0.1) + 0.1) * 20)).sort((a, b) => a - b).reverse());
    };
    if (mode === 'with duplicates'){
      setArr(Array(ARR_COUNT).fill(Math.floor((Math.random() * (1 - 0.1) + 0.1) * 20)));

    };
  };

  function startSorting() {
    setIsSorting(true);
    setSortCompleted({ quickSortDuplicates:false, bubbleSort:false, selectionSort:false, heapSort:false, quickSortBase:false });
    // Trigger sorting in child components
  };

  function handleSortCompletion(sortName:string) {
    setSortCompleted((prev) => ({ ...prev, [sortName]: true }));
  };

  function resetSorting() {
    // Reset sorting state in child components
    setIsSorting(false);
    setSortCompleted({ quickSortDuplicates:false, bubbleSort:false, selectionSort:false, heapSort:false, quickSortBase:false });
  };

  const allSortsCompleted = mode === 'all' ? Object.values(sortCompleted).every((completed) => completed) : sortCompleted[mode];

  return(
    <div>
      <div>
        {MODES.map((val, idx) => (
          <button disabled={isSorting} key={`modes-button-${val}-${idx}`} onClick={() => setMode(val)}>{val}</button>
        ))}
      </div>
      <div className={`${mode === 'all' ? 'test-container' : ''}`}>
        {(mode === 'all' || mode === 'bubbleSort')&&
          <BubbleSort arr={arr} isSorting={isSorting} onSortComplete={() => handleSortCompletion('bubbleSort')} time={200}/>
        }
        {(mode === 'all' || mode === 'selectionSort')&&
          <SelectionSort arr={arr} isSorting={isSorting} onSortComplete={() => handleSortCompletion('selectionSort')} time={200}/>
        }
        {(mode === 'all' || mode === 'heapSort')&&
          <HeapSort arr={arr} isSorting={isSorting} onSortComplete={() => handleSortCompletion('heapSort')} time={200}/>
        }
        {(mode === 'all' || mode === 'quickSortBase')&&
          <QuickSortBase arr={arr} isSorting={isSorting} onSortComplete={() => handleSortCompletion('quickSortBase')} time={200}/>
        }
        {(mode === 'all' || mode === 'quickSortDuplicates')&&
        <QuickSortDuplicate arr={arr} isSorting={isSorting} onSortComplete={() => handleSortCompletion('quickSortDuplicates')} time={200}/>
        }
      </div>
      <div>
        <button onClick={startSorting} disabled={isSorting}>Start Sorting</button>
        {ARR_MODES.map((val, idx) => (
          <button disabled={isSorting} key={`arr-modes-button-${val}-${idx}`} onClick={() => handleArray(val)}>{val}</button>
        ))}
        <button onClick={resetSorting} disabled={!allSortsCompleted}>Reset</button>
      </div>
    </div>
  )
}

export default App
