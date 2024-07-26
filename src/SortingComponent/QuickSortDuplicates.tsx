import React, {ComponentProps, useEffect, useState, useRef} from 'react'

/**
 left = j
 pivotIdx = pivotVal[0]
 pivotVal = pivotVal[1]
 lt = pivotIdx[0]
 gt = pivotIdx[1]
 */


const QuickSortDuplicate:React.FC<ComponentProps<'div'> & {arr:number[], isSorting:boolean, onSortComplete:() => void, time:number}> = ({arr, isSorting, onSortComplete, time}) => {
  const [localArr, setLocalArr] = useState<number[]>([...arr]);
  const [phase, setPhase] = useState<'none' | 'setUp' | 'loopBefore' | 'partition' | 'loopAfter' | 'finish'>('none');
  const [lo, setLo] = useState<number>(0);
  const [hi, setHi] = useState<number>(localArr.length - 1);
  const [j, setJ] = useState<number>(0);
  const [pivotIdx, setPivotIdx] = useState<[number, number]>([-1, -1]);
  const [pivotVal, setPivotVal] = useState<[number, number]>([-1, -1]);
  const [stack, setStack] = useState<number[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocalArr([...arr]);
    setHi(arr.length - 1);
  },[arr])

  useEffect(() => {
    if (phase !== 'finish'){
      return
    };
    onSortComplete();
    setPhase('none');
    setLo(0);
    setHi(localArr.length - 1);
    setJ(0);
    setPivotIdx([-1, -1]);
    setPivotVal([-1, -1]);
    setStack([]);
  },[phase])

  useEffect(() => {
    if (isSorting){
      setPhase('setUp');
    };
  },[isSorting])

  useEffect(() => {
    if (!ref.current || phase === 'none' || phase === 'finish'){
      return
    };

    let timeOut = undefined;

    if (phase === 'setUp'){
      const newStack = [...stack];

      newStack.push(lo);
      newStack.push(hi);
      setStack(newStack);
      setPhase('loopBefore');

    }else if (phase === 'partition'){
      const newArr = [...localArr];
      const children = ref.current.children;
      let lower = false;
      let higher = false;

      if (j <= pivotIdx[1]){
        children[j].classList.add('compare');
        children[pivotVal[0]].classList.add('compare');

        if (newArr[j] < pivotVal[1]){
          children[j].classList.remove('compare');
          children[j].classList.add('found');
          lower = true;
        }else if (newArr[j] > pivotVal[1]){
          children[j].classList.remove('compare');
          children[j].classList.add('found');
          higher = true;
        };
      };

      timeOut = setTimeout(() => {
        if (j <= pivotIdx[1]){
          children[j].classList.remove('compare', 'found');
          children[pivotVal[0]].classList.remove('compare');
          if (lower){
            const temp = newArr[pivotIdx[0]];
            newArr[pivotIdx[0]] = newArr[j];
            newArr[j] = temp;

            setLocalArr(newArr);
            setJ(prev => prev + 1);
            setPivotIdx(prevPivot => {
              const newPrevPivot = [...prevPivot] as [number, number];
              newPrevPivot[0] += 1;

              return newPrevPivot;
            });
          }else if (higher){
            const temp = newArr[pivotIdx[1]];
            newArr[pivotIdx[1]] = newArr[j];
            newArr[j] = temp;

            setLocalArr(newArr);
            setPivotIdx(prevPivot => {
              const newPrevPivot = [...prevPivot] as [number, number];
              newPrevPivot[1] -= 1;

              return newPrevPivot
            });
          }else{
            setJ(prev => prev + 1);
          };

        }else{
          setPhase('loopAfter');
        };
      },time);

    }else if (phase === 'loopBefore'){
        const newStack = [...stack];
        if (newStack.length <= 0){
          setPhase('finish')
          return
        }

        if (newStack[newStack.length - 2] >= newStack[newStack.length - 1]){
          newStack.pop();
          newStack.pop();
          setStack(newStack);

          return
        };
        setLo(newStack[newStack.length - 2]);
        setJ(newStack[newStack.length - 2]);
        setHi(newStack[newStack.length - 1]);
        setPivotVal([newStack[newStack.length - 2], localArr[newStack[newStack.length - 2]]])
        setPivotIdx([newStack[newStack.length - 2], newStack[newStack.length - 1]]);
        newStack.pop();
        newStack.pop();

        setStack(newStack);
        setPhase('partition');
    }else{
        const newStack = [...stack];
        const [lt, gt] = pivotIdx;

        newStack.push(lo);
        newStack.push(lt - 1);
        newStack.push(gt + 1);
        newStack.push(hi);
        setStack(newStack);
        setPhase('loopBefore');
    };

    return () => {
      if (timeOut){
        clearTimeout(timeOut);
      };
    }

  },[phase, lo, hi, pivotIdx, top, j, stack.length]);

  return (
    <div>
      <div>
        quick sort3
      </div>
      <div ref={ref} className='container'>
        {localArr.map((num, i) => {
          return <div key={`box-bubble-${num}-${i}`} className='box' style={{height:`${10 * num}px`}}>

          </div>
          })}
        </div>
    </div>
  )
}

export default QuickSortDuplicate