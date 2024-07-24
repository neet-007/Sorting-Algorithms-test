import React, {ComponentProps, useEffect, useState} from 'react'

const QuickSortDuplicate:React.FC<ComponentProps<'div'> & {arr:number[], isSorting:boolean}> = ({arr, isSorting}) => {
  const [localArr, setLocalArr] = useState<number[]>([...arr])
  const [currindex, setCurrIndex] = useState<number>(-1);



  return (
    <div>
      <div className='container'>
        {localArr.map((num, i) => {
          return <div key={`box-bubble-${num}-${i}`} className='box' style={{height:`${10 * num}px`}}>
            {num}
          </div>
          })}
        </div>
    </div>
  )
}

export default QuickSortDuplicate