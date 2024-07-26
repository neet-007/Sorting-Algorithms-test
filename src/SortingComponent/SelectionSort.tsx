import React, {ComponentProps, useEffect, useRef, useState} from 'react'

const SelectionSort:React.FC<ComponentProps<'div'> & {arr:number[], isSorting:boolean, onSortComplete:() => void, time:number}> = ({arr, isSorting, onSortComplete, time}) => {
    const [localArr, setLocalArr] = useState<number[]>([...arr])
    const [i, setI] = useState<number>(0);
    const [j, setJ] = useState<number>(1);
    const [currMin, setCurrMin] = useState<number>(0);
    const [localIsSorting, setLocalIsSorting] = useState<boolean>(isSorting);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      setLocalArr([...arr]);
    },[arr])

    useEffect(() => {
      if (i !== -1){
        return
      }
      setLocalIsSorting(false)
      onSortComplete()
    },[i])

    useEffect(() => {
      setLocalIsSorting(isSorting);
      setI(0);
    },[isSorting])

    useEffect(() => {
      if (!localIsSorting || i < 0 || !ref.current){
        return
      };

      const children = ref.current.children;
      const newArr = [...localArr];
      let found = false;

      if (j < newArr.length){

        children[currMin].classList.add('compare');
        children[j].classList.add('compare');

        if (newArr[j] < newArr[currMin]){
          children[currMin].classList.remove('found');
          children[j].classList.remove('compare');
          children[j].classList.add('found');
          found = true;
        };
      }

      const timeOut = setTimeout(() => {
        if (j < newArr.length){
          children[currMin].classList.remove('compare', 'found');
          children[j].classList.remove('compare', 'found');
          setJ(prevJ => {
            if (found){
              setCurrMin(prevJ);
            };
            return prevJ + 1
          })

        }else{
          const temp = newArr[i];
          newArr[i] = newArr[currMin];
          newArr[currMin] = temp;
          setLocalArr(newArr);
          setI(prevI => {
            if (prevI === localArr.length - 2){
              return - 1
            };
            setJ(prevI + 2);
            setCurrMin(prevI + 1);

            return prevI + 1;
          })
        };
      },time);


      return () => clearTimeout(timeOut);
    },[i, j, currMin, localIsSorting])

    return (
      <div>
        <div>selection sort</div>
        <div ref={ref} className='container'>
          {localArr.map((num, i) => {
            return <div key={`box-bubble-${num}-${i}`} className='box' style={{height:`${10 * num}px`}}>
            </div>
            })}
          </div>
      </div>
    )
}

export default SelectionSort