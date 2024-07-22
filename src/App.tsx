import { useState } from 'react'
import BubbleSort from './SortingComponent/BubbleSort'
import HeapSort from './SortingComponent/HeapSort'
import QuickSortBase from './SortingComponent/QuickSortBase'
import QuickSortDuplicate from './SortingComponent/QuickSortDuplicates'
import SelectionSort from './SortingComponent/SelectionSort'
import './App.css'

export type BoxType = {
  val:number,
  className: 'move-right' | 'move-left' | ''
}



function App() {
  const [arr] = useState<BoxType[]>(Array(7).fill({val:0, className:''}).map(() => ({val:Math.floor((Math.random() * (1 - 0.1) + 0.1) * 20), className:''})))
  const [isSorting, setIsSoring] = useState<boolean>(false);
  return(
    <div>
      <div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
        <BubbleSort arr={arr} isSorting={isSorting}/>
        <SelectionSort arr={arr} isSorting={isSorting}/>
        <HeapSort arr={arr} isSorting={isSorting}/>
        <QuickSortBase arr={arr} isSorting={isSorting}/>
        <QuickSortDuplicate arr={arr} isSorting={isSorting}/>
      </div>
      <button onClick={() => setIsSoring(true)}>sort</button>
    </div>
  )
}

export default App
