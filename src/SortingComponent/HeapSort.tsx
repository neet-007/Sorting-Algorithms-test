import React, {ComponentProps, useEffect, useRef, useState} from 'react'

function getChild(index:number, dir:'l' | 'r'){
  if (dir === 'l'){
    return (index * 2) + 1
  }else{
    return (index * 2) + 2
  };
};

const HeapSort:React.FC<ComponentProps<'div'> & {arr:number[], isSorting:boolean, onSortComplete:() => void}> = ({arr, isSorting, onSortComplete}) => {
    const [localArr, setLocalArr] = useState<number[]>([...arr]);
    const [length, setLength] = useState<number>(arr.length);
    const [currIndex, setCurrIndex] = useState<number>(Math.floor(arr.length / 2) + 1);
    const [prevPhase, setPrevPhase] = useState<'none' | 'buildHeap' | 'getMax' | 'heapifyDown' | 'sort' | 'finish'>('none');
    const [phase, setPhase] = useState<'none' | 'buildHeap' | 'getMax' | 'heapifyDown' | 'sort' | 'finish'>('none');
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (isSorting){
        setPrevPhase('none');
        setPhase('buildHeap');
      };
    },[isSorting])

    useEffect(() => {
      if (phase !== 'finish'){
        return
      };
      onSortComplete()
      setPrevPhase('finish');
      setPhase('none');
      setLength(arr.length);
    },[phase])

    useEffect(() => {
      if (!ref.current || phase === 'none' || phase === 'finish'){
        return
      };

      const newArr = [...localArr];
      const children = ref.current.children;

      let timeOut = undefined;

      if (phase === 'buildHeap'){
        setCurrIndex(prev => {
          setPrevPhase('buildHeap');
          if (prev === 0){
            setPhase('sort');
            return 0
          };

          setPhase('heapifyDown');
          return prev - 1
        })
      }else if (phase === 'heapifyDown'){
        if (currIndex >= length){
          setPrevPhase('heapifyDown')
          setPhase(prevPhase);
          return
        };

        let bigIndex = currIndex;
        let found = false;
        const leftChild = getChild(currIndex, 'l');
        children[bigIndex].classList.add('compare');
        if (leftChild < length){
          children[leftChild].classList.add('compare');
        }

        if (leftChild < length && newArr[leftChild] > newArr[bigIndex]){
          children[bigIndex].classList.remove('compare');
          children[leftChild].classList.add('found');
          bigIndex = leftChild;
          found = true;
        }
        if (leftChild < length){
          children[leftChild].classList.remove('compare');
        }

        const rigthChild = getChild(currIndex, 'r');
        if (rigthChild < length){
          children[rigthChild].classList.add('compare');
        };

        if (rigthChild < length && newArr[rigthChild] > newArr[bigIndex]){
          children[bigIndex].classList.remove('compare');
          children[rigthChild].classList.add('found');
          bigIndex = rigthChild;
          found = true;
        };
        if (rigthChild < length){
          children[rigthChild].classList.remove('compare');
        }

        timeOut = setTimeout(() => {
          children[currIndex].classList.remove('compare');
          children[bigIndex].classList.remove('found');
          if (!found){
            setPrevPhase('heapifyDown');
            setPhase(prevPhase);
          }else{
            const temp = newArr[bigIndex];
            newArr[bigIndex] = newArr[currIndex];
            newArr[currIndex] = temp;

            setLocalArr(newArr);
            setCurrIndex(bigIndex);
          }
        },500);


      }else if (phase === 'getMax'){
        if (length === 0){
          setPrevPhase('getMax');
          setPhase('finish');
          return
        }
        children[0].classList.add('compare');
        children[length - 1].classList.add('compare');

        timeOut = setTimeout(() => {
          children[0].classList.remove('compare');
          children[length - 1].classList.remove('compare');
          const temp = newArr[0];
          newArr[0] = newArr[length - 1];
          newArr[length - 1] = temp;

          setLocalArr(newArr);
          setLength(prev => prev - 1);
          setPrevPhase('getMax');
          setPhase('heapifyDown');
          setCurrIndex(0);
        },500)
      }else{
        setPrevPhase('sort');
        if (length <= 0){
          setPhase('finish');
        }else{
          setPhase('getMax');
        };
      };

      return () => {
        if (timeOut){
          clearTimeout(timeOut);
        };
      }
    },[phase, length, currIndex])

    return (
      <div>
        <div>heap sort</div>
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

export default HeapSort