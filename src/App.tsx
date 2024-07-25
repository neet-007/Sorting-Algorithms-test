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

function App() {
  const [arr] = useState<number[]>(Array(7).fill(0).map(() => (Math.floor((Math.random() * (1 - 0.1) + 0.1) * 20))))
  const [isSorting, setIsSorting] = useState(false);
  const [sortCompleted, setSortCompleted] = useState({ heapSort: false});

  useEffect(() => {
    const condition = Object.values(sortCompleted).every((completed) => completed);
    if (condition){
      setIsSorting(false)
    }
  },Object.values(sortCompleted))

  const startSorting = () => {
    setIsSorting(true);
    setSortCompleted({ heapSort: false });
    // Trigger sorting in child components
  };

  const handleSortCompletion = (sortName:string) => {
    setSortCompleted((prev) => ({ ...prev, [sortName]: true }));
  };

  const resetSorting = () => {
    // Reset sorting state in child components
    setIsSorting(false);
    setSortCompleted({ heapSort: false });
  };

  const allSortsCompleted = Object.values(sortCompleted).every((completed) => completed);

  return(
    <div>
      <div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
        <HeapSort arr={arr} isSorting={isSorting} onSortComplete={() => handleSortCompletion('heapSort')}/>
        {/*
        <QuickSortDuplicate arr={arr} isSorting={isSorting} onSortComplete={() => handleSortCompletion('quickSortDupicates')}/>
          <BubbleSort arr={arr} isSorting={isSorting} onSortComplete={() => handleSortCompletion('bubbleSort')}/>
          <SelectionSort arr={arr} isSorting={isSorting} onSortComplete={() => handleSortCompletion('selectionSort')}/>
          <QuickSortBase arr={arr} isSorting={isSorting} onSortComplete={() => handleSortCompletion('quickSort')}/>
        */
        }
      </div>
      <button onClick={startSorting} disabled={isSorting}>Start Sorting</button>
      <button onClick={resetSorting} disabled={!allSortsCompleted}>Reset</button>
    </div>
  )
}

export default App
