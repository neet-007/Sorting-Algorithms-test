import React, {ComponentProps, useEffect, useState, useRef} from 'react'

/**
 left = j
 pivot = pivotIdx[0]
 prev index = pivotIdx[1]
 post index = pivotIdx[0]
 */


const QuickSortDuplicate:React.FC<ComponentProps<'div'> & {arr:number[], isSorting:boolean, onSortComplete:() => void}> = ({arr, isSorting, onSortComplete}) => {
  const [localArr, setLocalArr] = useState<number[]>([...arr]);
  const [localIsSorting, setLocalIsSorting] = useState<boolean>(false);
  const [phase, setPhase] = useState<'none' | 'setUp' | 'loopBefore' | 'partition1' | 'partition2' | 'loopAfter' | 'finish'>('none');
  const [lo, setLo] = useState<number>(0);
  const [hi, setHi] = useState<number>(arr.length - 1);
  const [j, setJ] = useState<number>(0);
  const [pivotIdx, setPivotIdx] = useState<[number, number]>([-1, -1]);
  const [top, setTop] = useState<number>(-1);
  const [stack, setStack] = useState<number[]>(Array(arr.length).fill(-1));
  const ref = useRef<HTMLDivElement>(null);

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

    }else if (phase === 'partition1'){
      const newArr = [...localArr];
      const children = ref.current.children;
      let found = false;

      children[j + 1].classList.add('compare');
      children[pivotIdx[0]].classList.add('compare');
      if (newArr[j + 1] < newArr[pivotIdx[0]]){
        children[j + 1].classList.remove('compare');
        children[j + 1].classList.add('found');
        found = true;
      };

      timeOut = setTimeout(() => {
        children[j + 1].classList.remove('compare');
        children[pivotIdx[0]].classList.remove('compare');
        if (j < hi){
          if (found){
            const temp = newArr[j + 1];
            newArr[j + 1] = newArr[pivotIdx[1] + 1]
            newArr[pivotIdx[1] + 1] = temp;
            setLocalArr(newArr);
            setPivotIdx(prev => {
              const newPrev = [...prev] as [number, number];
              newPrev[1] += 1;
  
              return newPrev
            })
            }
            setJ(prev => prev + 1);
          }else{
            const temp = newArr[pivotIdx[0]];
            newArr[pivotIdx[0]] = newArr[pivotIdx[1]];
            newArr[pivotIdx[1]] = temp;
            setPivotIdx(prevPivot => {
              const newPivot = [...prevPivot] as [number, number]
              setJ(newPivot[1] + 1);
              newPivot[0] = newPivot[1];
              return newPivot
            });
            setLocalArr(newArr);
            setPhase('partition2');
          }
      },2000);
    }else if (phase === 'partition2'){
      const newArr = [...localArr];
      const children = ref.current.children;
      let found = false;

      children[pivotIdx[j]].classList.add('compare');
      children[pivotIdx[0]].classList.add('compare');
      if (newArr[j] === newArr[pivotIdx[0]]){
        children[j].classList.remove('compare');
        children[j].classList.add('found');
      };

      timeOut = setTimeout(() => {
        if (j < hi){
          if (found){
            const temp = newArr[j];
            newArr[j] = newArr[pivotIdx[1] + 1];
            newArr[pivotIdx[1] + 1] = temp;
            setLocalArr(newArr);
            setPivotIdx(prevPivot => {
              const newPivot = [...prevPivot] as [number, number];
              newPivot[1] += 1;

              return newPivot
            })
          };
          setJ(prev => prev + 1);
        }else{
          setPhase('loopAfter');
        }
      },2000);

    }else if (phase === 'loopBefore'){

        if (top < 0){
          setPhase('finish')
          return
        }
        let top_ = top;
        setHi(stack[top_]);
        top_ -= 1;
        setLo(stack[top_]);
        setJ(stack[top_]);
        setPivotIdx([stack[top_], stack[top_]]);
        setTop(top_ - 1);
        setPhase('partition1');

    }else{

        const newStack = [...stack];
        let top_ = top;
        const [pivotIdx1, pivotIdx2] = pivotIdx;
        if (pivotIdx1 - 1 > lo){
          top_ += 1;
          newStack[top_] = lo;
          top_ += 1;
          newStack[top_] = pivotIdx1 - 1;
        };

        if (pivotIdx2 + 1 < hi){
          top_ += 1;
          newStack[top_] = pivotIdx2 + 1;
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

  },[localIsSorting, phase, lo, hi, pivotIdx, top, j]);

  return (
    <div>
      <div ref={ref} className='container'>
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