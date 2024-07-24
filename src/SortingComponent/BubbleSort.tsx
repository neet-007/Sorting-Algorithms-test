import React, {ComponentProps, useEffect, useRef, useState} from 'react'
import { BoxType } from '../App'

const BubbleSort:React.FC<ComponentProps<'div'> & {arr:BoxType[], isSorting:boolean, onSortComplete:() => void}> = ({arr, isSorting, onSortComplete}) => {
    const [localArr, setLocalArr] = useState<BoxType[]>([...arr]);
    const [i, setI] = useState<number>(0);
    const [j, setJ] = useState<number>(0);
    const [swapped, setSwapped] = useState<boolean>(false);
    const [localIsSorting, setLocalIsSorting] = useState<boolean>(isSorting);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (i === localArr.length - 1 || i === -1) {
        setLocalIsSorting(false);
        onSortComplete();
        setI(0);
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
      let swapped_ = swapped

      children[j].classList.add('compare');
      children[j + 1].classList.add('compare');

      if (newArr[j].val > newArr[j + 1].val) {
        const temp = newArr[j];
        newArr[j] = newArr[j + 1];
        newArr[j + 1] = temp;
        setSwapped(true);
        swapped_ = true
        children[j].classList.add('move-left');
        children[j + 1].classList.add('move-right');
      }

      const timeout = setTimeout(() => {
        children[j].classList.remove('compare');
        children[j + 1].classList.remove('compare');
        setLocalArr(newArr);
        setJ(prev => {
          if (prev === localArr.length - i - 2) {
            setSwapped(false)
            setI(prevI => {
              if (!swapped_){
                return -1
              }
              return prevI + 1
            });
            return 0;
          }
          return prev + 1;
        });
      }, 500);

      return () => clearTimeout(timeout);
    }, [i, j, localIsSorting, localArr, swapped]);


    return (
      <div>
        <div ref={ref} className='container'>
          {localArr.map((num, i) => {
            return <div key={`box-bubble-${num.val}-${i}`} className={`box ${num.className}`} style={{height:`${10 * num.val}px`}}>
              {num.val}
            </div>
            })}
          </div>
      </div>
    )
}

export default BubbleSort