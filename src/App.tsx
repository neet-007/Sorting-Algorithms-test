import { useEffect, useRef, useState } from 'react'
import BubbleSort from './SortingComponent/BubbleSort'
import HeapSort from './SortingComponent/HeapSort'
import QuickSortBase from './SortingComponent/QuickSortBase'
import QuickSortDuplicate from './SortingComponent/QuickSortDuplicates'
import SelectionSort from './SortingComponent/SelectionSort'
import './App.css'
import InfoComponent from './SortingComponent/InfoComponent'

/**
 ---COMMANDS---
  * -2 setting sortCompelete of the sort to true
  * -1 intial state
  * > -1 sorting
 */

const ARR_MODES = ['random', 'sorted', 'reversed', 'with duplicates'] as const;
const MODES = ['all' , 'bubbleSort' , 'selectionSort' , 'quickSortBase' , 'quickSortDuplicates' , 'heapSort'] as const;

function App() {
  const [arrSize, setArrSize] = useState<number>(30);
  const [arr, setArr] = useState<number[]>(Array(arrSize).fill(0).map(() => Math.floor((Math.random() * (1 - 0.1) + 0.1) * 20)).sort((a, b) => a - b).reverse())
  const [arrMode, setArrMode] = useState<'random' | 'sorted' | 'reversed' | 'with duplicates'>('random')
  const [mode, setMode] = useState<'all' | 'bubbleSort' | 'selectionSort' | 'quickSortBase' | 'quickSortDuplicates' | 'heapSort'>('all');
  const [isSorting, setIsSorting] = useState(false);
  const [sortCompleted, setSortCompleted] = useState({ quickSortDuplicates:false, bubbleSort:false, selectionSort:false, heapSort:false, quickSortBase:false });
  const [speed, setSpeed] = useState<number>(100);
  const inputRef = useRef<HTMLInputElement>(null);
  const arrSizeRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    handleArray();
  },[arrSize, arrMode])

  function handleArrSize(){
    if (!arrSizeRef.current){
      return
    };
    if (Number(arrSizeRef.current.value) > 30){
      alert('max val is 30');
      return
    };

    setArrSize(Number(arrSizeRef.current.value));
  }

  function handleSpeed(){
    if (!inputRef.current){
      return
    };

    setSpeed(Number(inputRef.current.value));
  };

  function handleArray(){
    if (arrMode === 'random'){
      setArr(Array(arrSize).fill(0).map(() => Math.floor((Math.random() * (1 - 0.1) + 0.1) * 20)));
    };
    if (arrMode === 'sorted'){
      setArr(Array(arrSize).fill(0).map(() => Math.floor((Math.random() * (1 - 0.1) + 0.1) * 20)).sort((a, b) => a - b));
    };
    if (arrMode === 'reversed'){
      setArr(Array(arrSize).fill(0).map(() => Math.floor((Math.random() * (1 - 0.1) + 0.1) * 20)).sort((a, b) => a - b).reverse());
    };
    if (arrMode === 'with duplicates'){
      setArr(Array(arrSize).fill(Math.floor((Math.random() * (1 - 0.1) + 0.1) * 20)));

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

  return(
    <div>
      <h1 className='h1'>sorting algorithms visualizer</h1>
      <div>
        <div className='flex align-items-center justify-content-between p-1 flex-wrap'>
          {MODES.map((val, idx) => (
            <button className='button' disabled={isSorting} key={`modes-button-${val}-${idx}`} onClick={() => setMode(val)}>{val}</button>
          ))}
        </div>
        <div className={`${mode === 'all' ? 'test-container' : ''}`}>
          {(mode === 'all' || mode === 'bubbleSort')&&
            <BubbleSort arr={arr} isSorting={isSorting} onSortComplete={() => handleSortCompletion('bubbleSort')} time={speed}/>
          }
          {(mode === 'all' || mode === 'selectionSort')&&
            <SelectionSort arr={arr} isSorting={isSorting} onSortComplete={() => handleSortCompletion('selectionSort')} time={speed}/>
          }
          {(mode === 'all' || mode === 'heapSort')&&
            <HeapSort arr={arr} isSorting={isSorting} onSortComplete={() => handleSortCompletion('heapSort')} time={speed}/>
          }
          {(mode === 'all' || mode === 'quickSortBase')&&
            <QuickSortBase arr={arr} isSorting={isSorting} onSortComplete={() => handleSortCompletion('quickSortBase')} time={speed}/>
          }
          {(mode === 'all' || mode === 'quickSortDuplicates')&&
          <QuickSortDuplicate arr={arr} isSorting={isSorting} onSortComplete={() => handleSortCompletion('quickSortDuplicates')} time={speed}/>
          }
        </div>
        <div>
          <div className='flex align-items-center justify-content-between p-1 flex-wrap'>
            <button className='button' onClick={startSorting} disabled={isSorting}>Start Sorting</button>
            {ARR_MODES.map((val, idx) => (
              <button className='button' disabled={isSorting} key={`arr-modes-button-${val}-${idx}`} onClick={() => setArrMode(val)}>{val}</button>
            ))}
          </div>
          <div className='flex align-items-center gap-1'>
            <label htmlFor="speed-input">set speed</label>
            <input className='input' type="number" min={0} name='speed-input' id='speed-input' ref={inputRef} placeholder='in mill seconds'/>
            <button className='button' disabled={isSorting} onClick={handleSpeed}>change speed</button>
          </div>
          <div className='flex align-items-center gap-1'>
            <label htmlFor="arr-size-input">set data size</label>
            <input className='input' type="number" min={0} max={30} name='arr-size-input' id='arr-size-input' ref={arrSizeRef} placeholder='max is 30'/>
            <button className='button' disabled={isSorting} onClick={handleArrSize}>change data size</button>
          </div>
        </div>
        {(mode !== 'all')&&
          MODES.slice(1).map((val, idx) => (
            val === mode ?
            <InfoComponent key={`info-${val}-${idx}`} name={val}/>
            :
            null
          ))
        }
      </div>
    </div>
  )
}

export default App
