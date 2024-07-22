import { useEffect, useRef, useState } from 'react'
import './App.css'

type BoxType = {
  val:number;
  className: 'move-left' | 'move-right' | ''
}

function App() {
  const [arr, setArr] = useState<BoxType[]>(Array(7).fill({val:0, className:''}).map(() => ({val:Math.floor(Math.random() * 20), className:''})))
  const [currindex, setCurrIndex] = useState<number>(-1);
  const nodeRef = useRef<HTMLDivElement>(null);

  console.log(arr)
  useEffect(() => {
    if (currindex < 0){
      return
    };

    const timeOut = setTimeout(() => {
      setArr(prevArr => {
        const newArr = [...prevArr];
        const temp = newArr[currindex];
        newArr[currindex] = newArr[currindex - 1];
        newArr[currindex - 1] = temp;
        newArr[currindex].className = 'move-right';
        newArr[currindex - 1].className = 'move-left';
        return newArr;
      });

      setCurrIndex(prev => prev === 1 ? -1 : prev - 1)
    },500)

    return () => clearTimeout(timeOut);
  },[currindex])

  return (
    <div>
      <div className='container' ref={nodeRef}>
        {arr.map((num, i) => (
          <div key={`box-${num.val}-${i}`} className={`box ${num.className}`} style={{height:`${10 * num.val}px`}}>
            {num.val}
          </div>
        ))}
        </div>
        <button onClick={() => setCurrIndex(arr.length - 1)}>sort</button>
    </div>
  )
}

export default App
