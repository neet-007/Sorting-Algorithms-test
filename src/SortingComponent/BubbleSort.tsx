import React, {ComponentProps, useEffect, useRef, useState} from 'react'

const BubbleSort:React.FC<ComponentProps<'div'> & {arr:number[], isSorting:boolean, onSortComplete:() => void, time:number}> = ({arr, isSorting, onSortComplete, time}) => {
    const [localArr, setLocalArr] = useState<number[]>([...arr]);
    const [i, setI] = useState<number>(0);
    const [j, setJ] = useState<number>(0);
    const [swapped, setSwapped] = useState<boolean>(false);
    const [localIsSorting, setLocalIsSorting] = useState<boolean>(isSorting);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      setLocalArr([...arr]);
    },[arr])

    useEffect(() => {
      if (i === localArr.length - 1 || i === -1) {
        setLocalIsSorting(false);
        onSortComplete();
        setI(0);
        setI(0);
        setSwapped(false);
      }
    }, [i, localArr.length, onSortComplete]);

    useEffect(() => {
      setLocalIsSorting(isSorting);
    }, [isSorting]);

    useEffect(() => {
      if (!localIsSorting || !ref.current || i >= localArr.length - 1 || i < 0) {
        return;
      }

      const children = ref.current.children;
      const newArr = [...localArr];

      let swapped_ = swapped;
      let found = false;

      if (j < newArr.length - i - 1){
        children[j].classList.add('compare');
        children[j + 1].classList.add('compare');

        if (newArr[j] > newArr[j + 1]) {
          swapped_ = true
          setSwapped(true);
          found = true;
          children[j].classList.remove('compare');
          children[j].classList.add('move-left', 'found');
          children[j + 1].classList.add('move-right');
        };
      };

      const timeout = setTimeout(() => {
        if (j < newArr.length - i - 1){
          children[j].classList.remove('compare', 'found');
          children[j + 1].classList.remove('compare', 'found');
          if (found){
            const temp = newArr[j];
            newArr[j] = newArr[j + 1];
            newArr[j + 1] = temp;

            setLocalArr(newArr);
          };
          setJ(prev => prev + 1);
        }else{
              setSwapped(false);
              setI(prevI => {
                if (!swapped_){
                  return -1
                }
                return prevI + 1
              });
              setJ(0);
        };
      }, time);

      return () => clearTimeout(timeout);
    }, [i, j, localIsSorting, localArr, swapped]);


    return (
      <div>
        <div>bubble sort</div>
        <div ref={ref} className='container'>
          {localArr.map((num, i) => {
            return <div key={`box-bubble-${num}-${i}`} className='box' style={{height:`${10 * num}px`}}>

            </div>
            })}
          </div>
      </div>
    )
}

export default BubbleSort