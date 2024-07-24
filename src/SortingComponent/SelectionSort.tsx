import React, {ComponentProps, useEffect, useRef, useState} from 'react'

const SelectionSort:React.FC<ComponentProps<'div'> & {arr:number[], isSorting:boolean, onSortComplete:() => void}> = ({arr, isSorting, onSortComplete}) => {
    const [localArr, setLocalArr] = useState<number[]>([...arr])
    const [i, setI] = useState<number>(0);
    const [j, setJ] = useState<number>(1);
    const [currMin, setCurrMin] = useState<number>(0);
    const [localIsSorting, setLocalIsSorting] = useState<boolean>(isSorting);
    const ref = useRef<HTMLDivElement>(null);

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
      children[currMin].classList.add('compare');
      children[j].classList.add('compare');

      if (newArr[j] < newArr[currMin]){
        children[currMin].classList.remove('found');
        children[j].classList.remove('compare');
        children[j].classList.add('found')
        setCurrMin(j);
      }
      if (j === newArr.length - 1){
        const temp = newArr[i];
        newArr[i] = newArr[currMin];
        newArr[currMin] = temp;
        setLocalArr(newArr);
      }

      const timeOut = setTimeout(() => {
        children[currMin].classList.remove('compare')
        children[j].classList.remove('compare')
        setJ(prevJ => {
          if (prevJ === localArr.length - 1){
            setI(prevI => {
              if (prevI === localArr.length - 2){
                console.log('heeeeeeeey')
                return -1
              };
              setCurrMin(prevI + 1);
              return prevI + 1
            })
            return i + 2
          };

          return prevJ + 1
        })
      },500);


      return () => clearTimeout(timeOut);
    },[i, j, currMin, localIsSorting])

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

export default SelectionSort