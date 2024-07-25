import React, {ComponentProps, useEffect, useRef, useState} from 'react'

const QuickSortBase:React.FC<ComponentProps<'div'> & {arr:number[], isSorting:boolean, onSortComplete:() => void, time:number}> = ({arr, isSorting, onSortComplete, time}) => {
  const [localArr, setLocalArr] = useState<number[]>([...arr]);
  const [localIsSorting, setLocalIsSorting] = useState<boolean>(false);
  const [phase, setPhase] = useState<'none' | 'setUp' | 'loopBefore' | 'partition' | 'loopAfter' | 'finish'>('none');
  const [lo, setLo] = useState<number>(0);
  const [hi, setHi] = useState<number>(arr.length - 1);
  const [j, setJ] = useState<number>(0);
  const [pivotIdx, setPivotIdx] = useState<number>(-1);
  const [pivotVal, setPivotVal] = useState<number>(arr[arr.length - 1]);
  const [top, setTop] = useState<number>(-1);
  const [stack, setStack] = useState<number[]>(Array(arr.length).fill(-1));
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocalArr([...arr]);
  },[arr])

  useEffect(() => {
    if (phase !== 'finish'){
      return
    };
    setLocalIsSorting(false);
    onSortComplete();
    setPhase('none');
  },[phase])

  useEffect(() => {
    if (isSorting){
      setLocalIsSorting(true);
      setPhase('setUp');
    };
  },[isSorting])

  useEffect(() => {
    if (!localIsSorting || phase === 'none' || !ref.current){
      return
    };

    let timeOut = undefined;

    if (phase === 'setUp'){
      let top_ = top;
      const newStack = [...stack];

      top_ += 1;
      newStack[top_] = lo;
      top_ += 1;
      newStack[top_] = hi;

      setTop(top_);
      setStack(newStack);
      setPhase('loopBefore');

    }else if (phase === 'partition'){
      const newArr = [...localArr];
      const children = ref.current.children;
      let found = false;

      children[j].classList.add('compare');
      children[hi].classList.add('compare');
      if (newArr[j] <= pivotVal){
        children[j].classList.add('found');
        found = true;
      };

      timeOut = setTimeout(() => {
        children[j].classList.remove('compare', 'found');
        children[hi].classList.remove('compare')
        if (j < hi){
          if (found){
            const temp = newArr[pivotIdx + 1];
            newArr[pivotIdx + 1] = newArr[j];
            newArr[j] = temp;
            setLocalArr(newArr);
            setPivotIdx(prev => prev + 1);
          };
          setJ(prev => prev + 1);
        }else{
          const temp = newArr[pivotIdx + 1];
          newArr[pivotIdx + 1] = newArr[hi];
          newArr[hi] = temp;
          setLocalArr(newArr);
          setPivotIdx(prev => prev + 1);
          setPhase('loopAfter');
        }
      },time);

    }else if (phase === 'loopBefore'){
        if (top < 0){
          setPhase('finish')
          return
        }
        let top_ = top;
        setHi(stack[top_]);
        setPivotVal(localArr[stack[top_]]);
        top_ -= 1;
        setLo(stack[top_]);
        setJ(stack[top_]);
        setTop(top_ - 1);
        setPivotIdx(stack[top_] - 1);
        setPhase('partition');

    }else{
        const newStack = [...stack];
        let top_ = top;
        if (pivotIdx - 1 > lo){
          top_ += 1;
          newStack[top_] = lo;
          top_ += 1;
          newStack[top_] = pivotIdx - 1;
        };

        if (pivotIdx + 1 < hi){
          top_ += 1;
          newStack[top_] = pivotIdx + 1;
          top_ += 1;
          newStack[top_] = hi;
        };

        setTop(top_);
        setStack(newStack);
        setPhase('loopBefore');

    };

    return () => {
      if (timeOut){
        clearTimeout(timeOut);
      };
    }

  },[localIsSorting, phase, lo, hi, pivotIdx, pivotVal, top, j]);

  return (
    <div>
      <div>quick sort base</div>
      <div ref={ref} className='container'>
        {localArr.map((num, i) => {
          return <div key={`box-bubble-${num}-${i}`} className='box' style={{height:`${10 * num}px`}}>

          </div>
          })}
        </div>
    </div>
  )
}

export default QuickSortBase