import React, {ComponentProps, useEffect, useState} from 'react'
import { BoxType } from '../App'

const BubbleSort:React.FC<ComponentProps<'div'> & {arr:BoxType[], isSorting:boolean, onSortComplete:() => void}> = ({arr, isSorting, onSortComplete}) => {
    const [localArr, setLocalArr] = useState<BoxType[]>([...arr])
    const [currindex, setCurrIndex] = useState<number>(-1);
    const [localIsSorting, setLocalIsSorting] = useState<boolean>(isSorting);

    useEffect(() =>{
      if (currindex !== -2){
        return
      }
      onSortComplete()
      setCurrIndex(-1)
    },[currindex])

    useEffect(() => {
      setLocalIsSorting(isSorting);
    },[isSorting])
  
    useEffect(() => {
      if (!localIsSorting){
        return
      };

      let timeOut = undefined;
      if (currindex === -1){
        setCurrIndex(localArr.length - 1);
        setLocalArr(prevArr => {
            const newArr = [...prevArr]
            newArr[newArr.length - 1].className = 'move-right';
            newArr[newArr.length - 2].className = 'move-left';

            return newArr
        })
      }else{
          timeOut = setTimeout(() => {
              setLocalArr(prevArr => {
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

                setCurrIndex(prev => {
                    if (prev === 1){
                        setLocalIsSorting(false);
                        return -2
                    };
                    return prev - 1
                })
            },500)
        }

      return () => {
        if (timeOut){
            clearTimeout(timeOut)
        }
      };
    },[currindex, localIsSorting])

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