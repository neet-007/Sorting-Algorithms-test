import React, {ComponentProps, useEffect, useState} from 'react'
import { BoxType } from '../App'

const BubbleSort:React.FC<ComponentProps<'div'> & {arr:BoxType[], isSorting:boolean, onSortComplete:() => void}> = ({arr, isSorting, onSortComplete}) => {
    const [localArr, setLocalArr] = useState<BoxType[]>([...arr]);
    const [currindex, setCurrIndex] = useState<number>(-1);
    const [length, setLength] = useState<number>(arr.length);
    const [localIsSorting, setLocalIsSorting] = useState<boolean>(isSorting);
    const [swapped, setSwapped] = useState<boolean>(false);
    console.log(currindex)

    useEffect(() => {
      if (currindex !== -2){
        return
      }
      setLocalIsSorting(false)
      onSortComplete()
      setCurrIndex(-1)
    },[currindex])

    useEffect(() => {
      setLocalIsSorting(isSorting);
    },[isSorting])

    useEffect(() => {
      if (!localIsSorting || currindex < -1){
        return
      };

      let timeOut = undefined;
      if (currindex === -1){
        setLocalArr(prevArr => {
          const newArr = [...prevArr]
          if (newArr[0].val > newArr[1].val){
            newArr[0].className = 'move-left';
            newArr[1].className = 'move-right';
            setSwapped(true);
          };

          return newArr
        });
        setCurrIndex(0);
      }else{
          timeOut = setTimeout(() => {
              setLocalArr(prevArr => {
                  const newArr = [...prevArr];
                  if (newArr[currindex].val > newArr[currindex + 1].val){
                    const temp = newArr[currindex];
                    newArr[currindex] = newArr[currindex + 1];
                    newArr[currindex + 1] = temp;
                  };

                  newArr[currindex].className = '';
                  if (currindex < length - 2){
                      if (newArr[currindex + 1].val > newArr[currindex + 2].val){
                        newArr[currindex + 1].className = 'move-left';
                        newArr[currindex + 2].className = 'move-right';
                        setSwapped(true)
                      }else{
                        newArr[currindex + 1].className = '';
                        newArr[currindex + 2].className = '';
                      }
                      setCurrIndex(prev => prev + 1)
                    }else{
                        console.log('ehhhhhhhhhhhere')
                        newArr[currindex + 1].className = '';
                        if (swapped){
                          setLength(prev => {
                            if (prev > 1){
                              setCurrIndex(0);
                              return prev - 1
                            }
                            setCurrIndex(-2);
                            return arr.length
                          });
                        }else{
                          setCurrIndex(-2);
                          setLength(arr.length);
                        }
                    };
                    return newArr;
                });
            },500)
        }

      return () => {
        if (timeOut){
            clearTimeout(timeOut)
        }
      };
    },[currindex, localIsSorting, length])

    return (
      <div>
        <div className='container'>
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