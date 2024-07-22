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

        newArr[currindex].className = '';
        if (currindex > 1){
          newArr[currindex - 1].className = 'move-right';
          newArr[currindex - 2].className = 'move-left';
        }else{
          newArr[currindex - 1].className = '';
        };

        return newArr;
      });

      setCurrIndex(prev => prev === 1 ? -1 : prev - 1)
    },2000)

    return () => {
      clearTimeout(timeOut)
    };
  },[currindex])

  function startAnimation(){
    setCurrIndex(arr.length - 1);
    setArr(prevArr => {
      const newArr = [...prevArr];
      newArr[newArr.length - 1].className = 'move-right';
      newArr[newArr.length - 2].className = 'move-left';

      return newArr
    });
  };

  return (
    <div>
      <div className='container' ref={nodeRef}>
        {arr.map((num, i) => (
          <div key={`box-${num.val}-${i}`} className={`box ${num.className}`} style={{height:`${10 * num.val}px`}}>
            {num.val}
          </div>
        ))}
        </div>
        <button onClick={startAnimation}>sort</button>
    </div>
  )
}

export default App
